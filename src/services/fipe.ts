export interface FipeData {
    CódigoFipe?: string;
    CodigoFipe?: string;
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: number;
    Combustivel: string;
    MesReferencia: string;
    TipoVeiculo: number;
    SiglaCombustivel: string;
}

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/caminhoes';

export async function fetchBrands() {
    const response = await fetch(`${BASE_URL}/marcas`);
    return response.json();
}

export async function fetchModels(brandId: string) {
    const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos`);
    const data = await response.json();
    return data.modelos;
}

export async function fetchYears(brandId: string, modelId: string) {
    const response = await fetch(`${BASE_URL}/marcas/${brandId}/modelos/${modelId}/anos`);
    return response.json();
}

// Keep existing function compatibility if any, or update logic
export async function fetchFipeInfo(fipeCodeOrYearId: string): Promise<FipeData[]> {
    // If it looks like a year ID (e.g. "2023-3"), this specific function signature might be confusing 
    // if mixing BrasilAPI (by code) and Parallelum (by yearId).
    // But for the Dialog, we fetch details manually in the component for now or add a new function.

    // Fallback to BrasilAPI for code lookup if needed
    try {
        const response = await fetch(`https://brasilapi.com.br/api/fipe/preco/v1/${fipeCodeOrYearId}`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        return [];
    }
}
