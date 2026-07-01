
const targetBrands = ['VOLVO', 'VOLKSWAGEN', 'SCANIA', 'MERCEDES-BENZ', 'FORD'];

// Map of desired models and their years to find
const desired = [
    { name: 'FH 540', year: '2023' },
    { name: '11.180', year: '2021' },
    { name: '9.170', year: '2020' },
    { name: 'R 450', year: '2022' }, // Scania
    { name: 'R-450', year: '2022' },
    { name: '1016', year: '2021' }, // Accelo
    { name: '1316', year: '2020' },
    { name: '19.320', year: '2008' },
    { name: 'FM 370', year: '2010' },
    { name: 'FH 460', year: '2022' },
    { name: '815', year: '2010' } // Cargo
];

async function run() {
    try {
        const brandsRes = await fetch('https://parallelum.com.br/fipe/api/v1/caminhoes/marcas');
        const brands = await brandsRes.json();
        const targets = brands.filter(b => targetBrands.some(tb => b.nome.toUpperCase().includes(tb)));

        for (const brand of targets) {
            console.log(`\nScanning ${brand.nome}...`);
            const modelsRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brand.codigo}/modelos`);
            const data = await modelsRes.json();

            for (const item of desired) {
                // Find models matching name
                const matches = data.modelos.filter(m => m.nome.toUpperCase().includes(item.name.toUpperCase()));

                for (const m of matches) {
                    // Fetch years
                    const yearsRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brand.codigo}/modelos/${m.codigo}/anos`);
                    const years = await yearsRes.json();

                    // Find matching year
                    const yearMatch = years.find(y => y.nome.includes(item.year));

                    if (yearMatch) {
                        // Fetch details
                        const detailRes = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brand.codigo}/modelos/${m.codigo}/anos/${yearMatch.codigo}`);
                        const detail = await detailRes.json();

                        console.log(`FOUND: ${detail.Marca} ${detail.Modelo} (${detail.AnoModelo}) -> FIPE: ${detail.CodigoFipe}`);
                    }
                }
            }
        }
    } catch (e) { console.error(e); }
}
run();
