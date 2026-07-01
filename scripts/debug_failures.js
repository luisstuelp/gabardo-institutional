
const brandMap = {
    'VW': '115',
    'MERCEDES': '109',
    'FORD': '105'
};

const targets = [
    { brand: 'MERCEDES', model: 'Accelo 1016', year: 2021 },
    { brand: 'FORD', model: 'Cargo 815', year: 2010 },
    { brand: 'VW', model: '19.320', year: 2008 }
];

async function run() {
    for (const t of targets) {
        console.log(`\n--- Debugging: ${t.brand} ${t.model} (${t.year}) ---`);
        const brandId = brandMap[t.brand];

        try {
            const res = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brandId}/modelos`);
            const data = await res.json();

            // Log ALL models that look somewhat similar
            const simpleQuery = t.model.replace(/[^0-9]/g, ''); // just numbers
            const matches = data.modelos.filter(m => m.nome.includes(simpleQuery));

            console.log(`Models matching "${simpleQuery}":`);
            matches.forEach(m => console.log(`  - ${m.nome} (ID: ${m.codigo})`));

            // Try to fetch years for the first match
            if (matches.length > 0) {
                const m = matches[0];
                console.log(`Checking years for ${m.nome}...`);
                const yRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brandId}/modelos/${m.codigo}/anos`);
                const years = await yRes.json();
                console.log("Years found:", years.map(y => y.nome).join(', '));
            }

        } catch (e) { console.error(e.message); }
    }
}
run();
