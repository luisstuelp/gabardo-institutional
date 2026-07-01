
async function list() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/fipe/marcas/v1/caminhoes');
        const brands = await response.json();
        const targets = ['VOLVO', 'VW - VOLKSWAGEN', 'SCANIA', 'MERCEDES-BENZ', 'FORD'];

        brands.forEach(b => {
            if (targets.some(t => b.nome.toUpperCase().includes(t))) {
                console.log(`${b.nome}: ${b.valor}`);
            }
        });
    } catch (e) {
        console.error(e);
    }
}
list();
