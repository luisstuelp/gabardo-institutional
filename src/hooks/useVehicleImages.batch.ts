import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';
import { VehicleImage } from '@/types/database';

// import { mockImages } from '@/data/mockData';

async function fetchPrimaryImagesForVehicles(vehicleIds: string[]): Promise<Record<string, VehicleImage>> {
  if (vehicleIds.length === 0) return {};

  const { data, error } = await supabase
    .from('vehicle_images')
    .select('*')
    .in('vehicle_id', vehicleIds)
    .eq('is_primary', true);

  if (error) {
    console.error('Error fetching vehicle images:', error);
    return {};
  }

  const imageMap: Record<string, VehicleImage> = {};
  data?.forEach((img) => {
    imageMap[img.vehicle_id] = img as VehicleImage;
  });

  return imageMap;
}

export function useVehicleImagesBatch(vehicleIds: string[]) {
  return useQuery({
    queryKey: ['vehicle-images-batch', vehicleIds],
    queryFn: () => fetchPrimaryImagesForVehicles(vehicleIds),
    enabled: vehicleIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
