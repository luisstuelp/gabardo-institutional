
async function findVW() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/fipe/marcas/v1/caminhoes');
        const brands = await response.json();
        const vw = brands.find(b => b.nome.toUpperCase().includes('VOLKS') || b.nome.toUpperCase().includes('VW'));
        if (vw) {
            console.log(`VW Found: ${vw.nome} (ID: ${vw.valor})`);
        } else {
            console.log("VW not found");
        }
    } catch (e) {
        console.error(e);
    }
}
findVW();
