import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';
import { VehicleImage } from '@/types/database';

import { mockImages } from '@/data/mockData';

async function fetchVehicleImages(vehicleId: string): Promise<VehicleImage[]> {
  const image = mockImages[vehicleId];
  return image ? [image] : [];
}

export function useVehicleImages(vehicleId: string) {
  return useQuery({
    queryKey: ['vehicle-images', vehicleId],
    queryFn: () => fetchVehicleImages(vehicleId),
    enabled: !!vehicleId,
  });
}
