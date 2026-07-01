import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFavorites, addFavorite, removeFavorite as removeFavoriteThunk } from '@/store/slices/favoritesSlice';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function useFavorites() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    } else {
      // Clear favorites if logged out? Or handle in slice/auth listener?
      // Slice has clearFavorites reducer.
    }
  }, [dispatch, user]);

  const favoriteVehicleIds = new Set(items.map((f) => f.vehicle_id));

  const toggleFavorite = useCallback(async (vehicleId: string) => {
    if (!user) {
      toast.error('Faça login para salvar favoritos');
      return;
    }

    if (favoriteVehicleIds.has(vehicleId)) {
      try {
        await dispatch(removeFavoriteThunk({ userId: user.id, vehicleId })).unwrap();
        toast.success('Removido dos favoritos');
      } catch (error) {
        console.error('Error removing favorite:', error);
        toast.error('Erro ao remover dos favoritos');
      }
    } else {
      try {
        await dispatch(addFavorite({ userId: user.id, vehicleId })).unwrap();
        toast.success('Adicionado aos favoritos');
      } catch (error) {
        console.error('Error adding favorite:', error);
        toast.error('Erro ao adicionar aos favoritos');
      }
    }
  }, [dispatch, user, favoriteVehicleIds]);

  const isFavorite = useCallback((vehicleId: string) => favoriteVehicleIds.has(vehicleId), [favoriteVehicleIds]);

  return {
    favorites: items,
    isLoading,
    toggleFavorite,
    isFavorite,
    isAuthenticated: !!user,
  };
}
