
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env (naive parsing)
const envFile = fs.readFileSync(path.resolve('.env'), 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, val] = line.split('=');
    if (key && val) env[key.trim()] = val.trim().replace(/"/g, '');
});

const supabaseUrl = env.NEXT_PUBLIC_TRUCKS_SUPABASE_URL || env.TRUCKS_SUPABASE_URL;
const supabaseKey =
    env.NEXT_PUBLIC_TRUCKS_SUPABASE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_TRUCKS_SUPABASE_ANON_KEY ||
    env.TRUCKS_SUPABASE_PUBLISHABLE_KEY ||
    env.TRUCKS_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing trucks Supabase environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const brandMap = {
    'VOLVO': '116',
    'VW': '115',
    'VOLKSWAGEN': '115',
    'SCANIA': '114',
    'MERCEDES': '109',
    'MERCEDES-BENZ': '109',
    'FORD': '105'
};

const manualOverrides = {
    'Ford Cargo 815': { model: '815', brand: 'FORD' }, // Key must match "Brand Model"
    'Mercedes-Benz Accelo 1016': { model: '1016', brand: 'MERCEDES' },
    'Mercedes-Benz Accelo 1316': { model: '1316', brand: 'MERCEDES' },
    'Volkswagen 19.320': { model: '19-320', brand: 'VW' },
    'Volkswagen Delivery 11.180': { model: '11.180', brand: 'VW' }
};

async function findFipe(brandName, modelName, year) {
    if (!brandName || !modelName || !year) return null;

    let searchBrand = brandName;
    let searchModel = modelName;

    // Check manual overrides
    const fullKey = `${brandName} ${modelName}`;
    if (manualOverrides[fullKey]) {
        searchBrand = manualOverrides[fullKey].brand;
        searchModel = manualOverrides[fullKey].model;
    }

    // Resolve Brand ID
    let brandId = null;
    for (const [k, v] of Object.entries(brandMap)) {
        if (searchBrand.toUpperCase().includes(k)) brandId = v;
    }

    if (!brandId) return null;

    try {
        // Fetch models
        const modelsRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brandId}/modelos`);
        const data = await modelsRes.json();

        // Clean model name for search
        let cleanModel = searchModel
            .replace(/Cargo|Delivery|Accelo|Globetrotter|Streamline|Automático|Manual|6x2|6x4|4x2/gi, '')
            .replace(/[^\w\s\.-]/g, '') // Allow dots and dashes
            .trim();

        if (cleanModel.length < 2) cleanModel = searchModel;

        const parts = cleanModel.split(/\s+/);

        let matches = data.modelos.filter(m => {
            const apiName = m.nome.toUpperCase();
            const target = cleanModel.toUpperCase();

            // 1. Direct inclusion
            if (apiName.includes(target)) return true;

            // 2. Try replacing dots with dashes or vice versa
            const targetAlt = target.replace(/\./g, '-');
            if (apiName.includes(targetAlt)) return true;

            // 3. Parts check
            if (parts.length > 1) {
                return parts.every(p => apiName.includes(p));
            }

            return false;
        });

        if (matches.length === 0) return null;

        // Try matches for year
        for (const m of matches) {
            const yearsRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brandId}/modelos/${m.codigo}/anos`);
            const years = await yearsRes.json();
            const yearMatch = years.find(y => y.nome.includes(String(year)));

            if (yearMatch) {
                const detailRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brandId}/modelos/${m.codigo}/anos/${yearMatch.codigo}`);
                const detail = await detailRes.json();

                // Double check if the year matches what we asked (Parallelum fuzzy matches sometimes)
                if (detail.AnoModelo === year || detail.AnoModelo === 32000) { // 32000 is Zero KM
                    return { code: detail.CodigoFipe, value: detail.Valor };
                }
            }
        }

    } catch (e) {
        console.error(`Error finding FIPE for ${brandName} ${modelName}:`, e.message);
    }
    return null;
}

async function run() {
    console.log("Fetching vehicles...");
    const { data: vehicles, error } = await supabase.from('vehicles').select('*');
    if (error) {
        console.error("Error fetching vehicles:", error);
        return;
    }
    console.log(`Found ${vehicles.length} vehicles.`);

    let sql = `-- FIPE Update Script (Generated ${new Date().toISOString()})\n`;
    let foundCount = 0;

    for (const v of vehicles) {
        process.stdout.write(`Processing ${v.brand} ${v.model} (${v.year_model})... `);
        const fipe = await findFipe(v.brand, v.model, v.year_model);

        if (fipe) {
            console.log(`FOUND: ${fipe.code} (${fipe.value})`);
            const val = parseFloat(fipe.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
            sql += `UPDATE vehicles SET fipe_code = '${fipe.code}', fipe_value = ${val} WHERE id = '${v.id}';\n`;
            foundCount++;
        } else {
            console.log(`NOT FOUND`);
        }
    }

    fs.writeFileSync('fipe_update.sql', sql);
    console.log(`\nDone! Found ${foundCount}/${vehicles.length}. SQL saved to fipe_update.sql`);
}

run();
