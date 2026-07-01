
async function debug() {
    const urls = [
        'https://brasilapi.com.br/api/fipe/veiculos/caminhoes/102', // Agrale
        'https://brasilapi.com.br/api/fipe/veiculos/caminhoes/109', // Mercedes
        'https://brasilapi.com.br/api/fipe/veiculos/caminhao/102',
        'https://brasilapi.com.br/api/fipe/veiculos/3/102'
    ];

    for (const url of urls) {
        try {
            const res = await fetch(url);
            console.log(`URL: ${url} -> Status: ${res.status}`);
            if (res.ok) {
                const json = await res.json();
                console.log(`  Items: ${json.length}`);
            }
        } catch (e) { console.error(e.message); }
    }
}
debug();
