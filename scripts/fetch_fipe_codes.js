
const targets = [
    { brandId: '116', brandName: 'VOLVO', models: ['FH 540', 'FM 370', 'FH 460'] },
    { brandId: '115', brandName: 'VW', models: ['11.180', '9.170', '19.320'] },
    { brandId: '114', brandName: 'SCANIA', models: ['R 450', 'R-450'] },
    { brandId: '109', brandName: 'MERCEDES', models: ['1016', '1316'] },
    { brandId: '105', brandName: 'FORD', models: ['815'] }
];

async function run() {
    console.log("Searching FIPE Codes...");

    for (const t of targets) {
        console.log(`fetching ${t.brandName}...`);
        try {
            const res = await fetch(`https://brasilapi.com.br/api/fipe/veiculos/caminhoes/${t.brandId}`);
            if (!res.ok) {
                console.log(`Failed ${t.brandName}: ${res.status}`);
                continue;
            }
            const allModels = await res.json();

            for (const modelQuery of t.models) {
                let matches = allModels.filter(m => m.nome.toUpperCase().includes(modelQuery.toUpperCase()));
                if (matches.length > 0) {
                    matches.forEach(m => console.log(`${t.brandName} | ${m.nome} | ${m.codigo}`));
                } else {
                    console.log(`NO MATCH: ${modelQuery}`);
                }
            }
        } catch (e) { console.error(`Err ${t.brandName}:`, e.message); }
    }
}
run();
