import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    fetchVehicles,
    deleteVehicle as deleteVehicleThunk,
    fetchVehicleById,
    createVehicle as createVehicleThunk,
    updateVehicle as updateVehicleThunk
} from '@/store/slices/vehiclesSlice';
import type { Vehicle } from '@/types/database';
import { toast } from 'sonner';

export type VehicleFormData = Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>;

export function useAdminVehicles() {
    const dispatch = useAppDispatch();
    const { items, isLoading, error } = useAppSelector((state) => state.vehicles);

    // Initial fetch
    useEffect(() => {
        // Always fetch fresh data for admin view, or rely on cache?
        // For admin, valid to fetch on mount.
        dispatch(fetchVehicles({ sortBy: 'created_at' }));
    }, [dispatch]);

    const deleteVehicle = useCallback(async (id: string) => {
        try {
            await dispatch(deleteVehicleThunk(id)).unwrap();
            toast.success('Veículo removido com sucesso');
        } catch (err) {
            console.error('Error deleting vehicle:', err);
            toast.error('Erro ao remover veículo');
            throw err;
        }
    }, [dispatch]);

    return {
        vehicles: items,
        isLoading,
        error,
        deleteVehicle, // Now a function, not an object with mutateAsync
    };
}

export function useAdminVehicle(id: string | undefined) {
    const dispatch = useAppDispatch();
    const { selectedVehicle, isLoading, error } = useAppSelector((state) => state.vehicles);

    useEffect(() => {
        if (id) {
            dispatch(fetchVehicleById(id));
        }
    }, [dispatch, id]);

    return {
        data: selectedVehicle, // Mapping selectedVehicle to 'data' to match old interface
        isLoading,
        error
    };
}

export function useAdminVehicleMutations() {
    const dispatch = useAppDispatch();

    const createVehicle = useCallback(async (data: any) => {
        try {
            // Check if slug generation is needed here or in API?
            // API/Slice expects Partial<Vehicle>.
            // Old hook generated slug. We should probably keep that logic or move to thunk.
            // The thunk just passes data to API. API insert passes data.
            // Let's generate slug here to be safe/consistent with old behavior.
            const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            const result = await dispatch(createVehicleThunk({ ...data, slug, status: 'available' })).unwrap();
            toast.success('Veículo criado com sucesso');
            return result;
        } catch (err) {
            console.error('Error creating vehicle:', err);
            toast.error('Erro ao criar veículo');
            throw err;
        }
    }, [dispatch]);

    const updateVehicle = useCallback(async ({ id, data }: { id: string; data: any }) => {
        try {
            const result = await dispatch(updateVehicleThunk({ id, updates: data })).unwrap();
            toast.success('Veículo atualizado com sucesso');
            return result;
        } catch (err) {
            console.error('Error updating vehicle:', err);
            toast.error('Erro ao atualizar veículo');
            throw err;
        }
    }, [dispatch]);

    return { createVehicle, updateVehicle };
}
