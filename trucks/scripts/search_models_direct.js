
async function search() {
    const brands = [
        { id: '103', name: 'FORD' },
        { id: '102', name: 'MERCEDES-BENZ' },
        { id: '104', name: 'SCANIA' },
        { id: '120', name: 'VOLVO' },
        { id: '101', name: 'VW - VOLKSWAGEN' }
    ];


    const specificModels = [
        'FH 540',
        '11.180',
        '9.170',
        'R-450', 'R 450',
        'Accelo 1016', '1016',
        'Accelo 1316', '1316',
        '19.320',
        'FM 370',
        'FH 460',
        '815'
    ];

    console.log("=== Searching Models Direct ===");

    for (const b of brands) {
        console.log(`\nFetching models for ${b.name} (ID: ${b.id})...`);

        try {
            const modelsResponse = await fetch(`https://brasilapi.com.br/api/fipe/veiculos/caminhoes/${b.id}`);
            if (!modelsResponse.ok) {
                console.log(`Failed to fetch: ${modelsResponse.status}`);
                continue;
            }
            const models = await modelsResponse.json();

            // Filter
            const matches = models.filter(m => {
                return specificModels.some(target => m.nome.toUpperCase().includes(target.toUpperCase()));
            });

            if (matches.length > 0) {
                console.log(`  Found ${matches.length} matches:`);
                matches.forEach(m => console.log(`    - ${m.nome} (FIPE: ${m.codigo})`));
            } else {
                console.log(`  No matches found for target models.`);
            }
        } catch (e) {
            console.error("Error fetching models:", e.message);
        }
    }
}

search();
