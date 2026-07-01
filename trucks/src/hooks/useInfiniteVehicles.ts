import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPublicVehicles, resetPublicList } from '@/store/slices/vehiclesSlice';
import { VehicleFilters } from '@/types/database';

export function useInfiniteVehicles(filters: VehicleFilters = {}, sortBy: string = 'recent') {
  const dispatch = useAppDispatch();
  const { publicItems, isLoading, isLoadingMore, hasMore, publicPage, totalCount, error } = useAppSelector(
    (state) => state.vehicles
  );

  // JSON stringify filters for dependency stability
  const filtersKey = JSON.stringify(filters);

  // Reset list when filters/sort change
  useEffect(() => {
    dispatch(resetPublicList());
    dispatch(fetchPublicVehicles({ filters, sortBy, page: 0 }));
  }, [dispatch, filtersKey, sortBy]);

  const fetchNextPage = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      dispatch(fetchPublicVehicles({ filters, sortBy, page: publicPage + 1 }));
    }
  }, [dispatch, filters, sortBy, publicPage, isLoadingMore, hasMore]);

  // Compatibility with useInfiniteQuery return shape
  return {
    data: {
      pages: [{
        vehicles: publicItems,
        totalCount,
        nextPage: hasMore ? publicPage + 1 : null
      }]
    },

    // Direct access if updated or needed
    vehicles: publicItems,
    isLoading,
    isFetchingNextPage: isLoadingMore,
    hasNextPage: hasMore,
    fetchNextPage,
    error,
    status: isLoading ? 'pending' : error ? 'error' : 'success',
  };
}
