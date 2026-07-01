
async function search() {
    const brandsResponse = await fetch('https://brasilapi.com.br/api/fipe/marcas/v1/caminhoes');
    const brands = await brandsResponse.json();
    console.log("First brand:", JSON.stringify(brands[0], null, 2));
}
search();
