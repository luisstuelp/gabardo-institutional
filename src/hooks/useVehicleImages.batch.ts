import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';
import type { ListingType, VehicleImage } from '@/types/database';

// import { mockImages } from '@/data/mockData';

async function fetchPrimaryImagesForVehicles(
  vehiclesOrIds: string[] | { id: string; listing_type?: ListingType }[]
): Promise<Record<string, VehicleImage>> {
  const vehicles = vehiclesOrIds.map((vehicle) =>
    typeof vehicle === 'string' ? { id: vehicle, listing_type: 'truck' as const } : vehicle
  );
  if (vehicles.length === 0) return {};

  const imageMap: Record<string, VehicleImage> = {};
  const addFirstImages = (images: VehicleImage[] | null) => {
    images?.forEach((image) => {
      if (!imageMap[image.vehicle_id]) {
        imageMap[image.vehicle_id] = image;
      }
    });
  };
  const truckIds = vehicles.filter((vehicle) => (vehicle.listing_type || 'truck') === 'truck').map(({ id }) => id);
  const genericVehicleIds = vehicles.filter((vehicle) => vehicle.listing_type === 'vehicle').map(({ id }) => id);
  const equipmentIds = vehicles.filter((vehicle) => vehicle.listing_type === 'equipment').map(({ id }) => id);

  if (truckIds.length > 0) {
    const { data, error } = await supabase
      .from('vehicle_images')
      .select('*')
      .in('vehicle_id', truckIds)
      .order('is_primary', { ascending: false })
      .order('display_order', { ascending: true });
    if (error) {
      console.error('Error fetching vehicle images:', error);
      return {};
    }
    addFirstImages(data as VehicleImage[]);
  }

  if (genericVehicleIds.length > 0) {
    const { data, error } = await supabase
      .from('generic_vehicle_images')
      .select('*')
      .in('vehicle_id', genericVehicleIds)
      .order('is_primary', { ascending: false })
      .order('display_order', { ascending: true });
    if (error) {
      console.error('Error fetching vehicle images:', error);
      return {};
    }
    addFirstImages(data as VehicleImage[]);
  }

  if (equipmentIds.length > 0) {
    const { data, error } = await supabase
      .from('equipment_images')
      .select('*')
      .in('vehicle_id', equipmentIds)
      .order('is_primary', { ascending: false })
      .order('display_order', { ascending: true });
    if (error) {
      console.error('Error fetching vehicle images:', error);
      return {};
    }
    addFirstImages(data as VehicleImage[]);
  }

  return imageMap;
}

export function useVehicleImagesBatch(vehicles: string[] | { id: string; listing_type?: ListingType }[]) {
  return useQuery({
    queryKey: ['vehicle-images-batch', vehicles],
    queryFn: () => fetchPrimaryImagesForVehicles(vehicles),
    enabled: vehicles.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
