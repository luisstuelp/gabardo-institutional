
async function search() {
    const brandsResponse = await fetch('https://brasilapi.com.br/api/fipe/marcas/v1/caminhoes');
    const brands = await brandsResponse.json();

    console.log("=== Available Brands ===");
    brands.forEach(b => console.log(`  ${b.nome} (ID: ${b.valor})`));

    // Target brands to look into
    const targetBrands = ['VOLVO', 'VW - VOLKSWAGEN', 'SCANIA', 'MERCEDES-BENZ', 'FORD'];

    console.log("\n=== Searching Models ===");

    for (const b of brands) {
        if (targetBrands.includes(b.nome.toUpperCase())) {
            console.log(`\nFetching models for ${b.nome} (ID: ${b.valor})...`);

            const modelsResponse = await fetch(`https://brasilapi.com.br/api/fipe/veiculos/caminhoes/${b.valor}`);
            const models = await modelsResponse.json();

            if (models.length > 0) {
                console.log(`  First model structure:`, JSON.stringify(models[0]));
            }

            // Filter for my specific models of interest
            const specificModels = [
                'FH 540', '11.180', '9.170', 'R-450', 'R 450', // Scania R450 might be R-450 or R 450
                '1016', '1316', '19.320', 'FM 370', 'FH 460', '815'
            ];

            const matches = models.filter(m => {
                return specificModels.some(target => m.nome.toUpperCase().includes(target.toUpperCase()));
            });

            if (matches.length > 0) {
                console.log(`  Found ${matches.length} matches:`);
                matches.forEach(m => console.log(`    - ${m.nome} (FIPE: ${m.codigo})`));
            } else {
                console.log(`  No matches found for target models.`);
            }
        }
    }
}

search();
