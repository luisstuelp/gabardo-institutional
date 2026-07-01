
async function check() {
    try {
        const res = await fetch('https://parallelum.com.br/fipe/api/v1/caminhoes/marcas');
        console.log(`Status: ${res.status}`);
        if (res.ok) {
            const json = await res.json();
            console.log("Brands found:", json.length);
            console.log("First brand:", JSON.stringify(json[0]));
        }
    } catch (e) { console.error(e.message); }
}
check();
