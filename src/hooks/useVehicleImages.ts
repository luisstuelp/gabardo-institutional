import { useQuery } from '@tanstack/react-query';
import { getVehicleImages } from '@/api/endpoints/vehicles';
import { VehicleImage } from '@/types/database';

async function fetchVehicleImages(vehicleId: string): Promise<VehicleImage[]> {
  const result = await getVehicleImages(vehicleId);
  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data ?? [];
}

export function useVehicleImages(vehicleId: string) {
  return useQuery({
    queryKey: ['vehicle-images', vehicleId],
    queryFn: () => fetchVehicleImages(vehicleId),
    enabled: !!vehicleId,
    staleTime: 30_000,
  });
}
