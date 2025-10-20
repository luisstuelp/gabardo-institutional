import { useState, useEffect, useCallback } from 'react';

const FIPE_API_BASE_URL = 'https://fipe.parallelum.com.br/api/v2';

export type VehicleType = 'cars' | 'motorcycles' | 'trucks';

export interface FipeBrand {
  code: string;
  name: string;
}

export interface FipeModel {
  code: string;
  name: string;
}

export interface FipeYear {
  code: string;
  name: string;
}

export interface FipeVehiclePrice {
  price: string;
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  vehicleType: number;
}

/**
 * Map vehicle category to FIPE API type
 */
export const mapVehicleCategoryToFipeType = (category: string): VehicleType => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('motocicleta') || categoryLower.includes('moto')) {
    return 'motorcycles';
  }
  
  if (
    categoryLower.includes('caminhão') ||
    categoryLower.includes('trator') ||
    categoryLower.includes('ônibus') ||
    categoryLower.includes('micro-ônibus') ||
    categoryLower.includes('máquina agrícola')
  ) {
    return 'trucks';
  }
  
  // Default to cars for: Automóvel, SUV, Pick-up, Van, Veículo Especial, etc.
  return 'cars';
};

/**
 * Custom hook for FIPE API integration
 */
export const useFipeApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch brands for a specific vehicle type
   */
  const fetchBrands = useCallback(async (vehicleType: VehicleType): Promise<FipeBrand[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${FIPE_API_BASE_URL}/${vehicleType}/brands`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar marcas');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar marcas';
      setError(errorMessage);
      console.error('Error fetching brands:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch models for a specific brand
   */
  const fetchModels = useCallback(async (
    vehicleType: VehicleType,
    brandCode: string
  ): Promise<FipeModel[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${FIPE_API_BASE_URL}/${vehicleType}/brands/${brandCode}/models`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar modelos');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar modelos';
      setError(errorMessage);
      console.error('Error fetching models:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch years for a specific model
   */
  const fetchYears = useCallback(async (
    vehicleType: VehicleType,
    brandCode: string,
    modelCode: string
  ): Promise<FipeYear[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${FIPE_API_BASE_URL}/${vehicleType}/brands/${brandCode}/models/${modelCode}/years`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar anos');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar anos';
      setError(errorMessage);
      console.error('Error fetching years:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch vehicle price from FIPE table
   */
  const fetchVehiclePrice = useCallback(async (
    vehicleType: VehicleType,
    brandCode: string,
    modelCode: string,
    yearCode: string
  ): Promise<FipeVehiclePrice | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${FIPE_API_BASE_URL}/${vehicleType}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar valor do veículo');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar valor do veículo';
      setError(errorMessage);
      console.error('Error fetching vehicle price:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchBrands,
    fetchModels,
    fetchYears,
    fetchVehiclePrice,
  };
};

/**
 * Hook to manage vehicle data with FIPE API integration
 */
export const useFipeVehicleData = (vehicleCategory: string) => {
  const { fetchBrands, fetchModels, fetchYears, fetchVehiclePrice, loading, error } = useFipeApi();
  
  const [brands, setBrands] = useState<FipeBrand[]>([]);
  const [models, setModels] = useState<FipeModel[]>([]);
  const [years, setYears] = useState<FipeYear[]>([]);
  
  const vehicleType = vehicleCategory ? mapVehicleCategoryToFipeType(vehicleCategory) : null;

  // Fetch brands when vehicle category changes
  useEffect(() => {
    if (!vehicleType) {
      setBrands([]);
      setModels([]);
      setYears([]);
      return;
    }

    const loadBrands = async () => {
      const brandsData = await fetchBrands(vehicleType);
      setBrands([...brandsData, { code: 'outros', name: 'Outros' }]);
      setModels([]);
      setYears([]);
    };

    loadBrands();
  }, [vehicleType, fetchBrands]);

  // Load models for a brand
  const loadModels = useCallback(async (brandCode: string) => {
    if (!vehicleType || !brandCode) {
      setModels([]);
      setYears([]);
      return;
    }

    const modelsData = await fetchModels(vehicleType, brandCode);
    setModels([...modelsData, { code: 'outros', name: 'Outros' }]);
    setYears([]);
  }, [vehicleType, fetchModels]);

  // Load years for a model
  const loadYears = useCallback(async (brandCode: string, modelCode: string) => {
    if (!vehicleType || !brandCode || !modelCode) {
      setYears([]);
      return;
    }

    const yearsData = await fetchYears(vehicleType, brandCode, modelCode);
    setYears(yearsData);
  }, [vehicleType, fetchYears]);

  // Load vehicle price from FIPE table
  const loadVehiclePrice = useCallback(async (
    brandCode: string,
    modelCode: string,
    yearCode: string
  ): Promise<FipeVehiclePrice | null> => {
    if (!vehicleType || !brandCode || !modelCode || !yearCode) {
      return null;
    }

    const priceData = await fetchVehiclePrice(vehicleType, brandCode, modelCode, yearCode);
    return priceData;
  }, [vehicleType, fetchVehiclePrice]);

  return {
    brands,
    models,
    years,
    loading,
    error,
    loadModels,
    loadYears,
    loadVehiclePrice,
  };
};
