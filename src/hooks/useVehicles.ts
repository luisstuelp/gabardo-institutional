import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchVehicles, fetchVehicleBySlug, setFilters } from '@/store/slices/vehiclesSlice';
import { VehicleFilters, VehicleWithImages } from '@/types/database';

export function useVehicles(filters: VehicleFilters = {}) {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.vehicles);

  // Sync filters from hook to store? 
  // Or just dispatch fetch with these filters? 
  // If we just dispatch fetch, the store's "filters" state might be out of sync if we don't also setFilters.
  // But strict reading: "Replace TanStack Query".
  // TanStack Query fetches based on keys.
  // We should dispatch fetchVehicles whenever filters change.

  useEffect(() => {
    // Only fetch if filters changed significantly or valid?
    // Deep comparison handled by React's dependency array if filters is stable.
    // Use JSON.stringify for deep compare of filters object?
    dispatch(fetchVehicles({ filters }));
  }, [dispatch, JSON.stringify(filters)]);

  return {
    data: items,
    isLoading,
    error,
  };
}

export function useVehicle(slug: string | undefined) {
  const dispatch = useAppDispatch();
  const { selectedVehicle, isLoading, error } = useAppSelector((state) => state.vehicles);

  useEffect(() => {
    if (slug) {
      dispatch(fetchVehicleBySlug(slug));
    }
  }, [dispatch, slug]);

  return {
    data: selectedVehicle,
    isLoading,
    error,
  };
}
