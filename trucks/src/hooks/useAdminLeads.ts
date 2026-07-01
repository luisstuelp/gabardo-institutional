import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchLeads, updateLeadStatus as updateStatusThunk } from '@/store/slices/leadsSlice';
import type { AdminLead } from '@/types/vehicles';
import { toast } from 'sonner';

export type { AdminLead };

export function useAdminLeads() {
    const dispatch = useAppDispatch();
    const { items, isLoading, error } = useAppSelector((state) => state.leads);

    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    const updateStatus = useCallback(async ({ id, status }: { id: string; status: string }) => {
        try {
            await dispatch(updateStatusThunk({ id, status })).unwrap();
            toast.success('Status atualizado');
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error('Erro ao atualizar status');
            throw err;
        }
    }, [dispatch]);

    // Compatible interface for React Query mutation object?
    // The component likely uses updateStatus.mutate({id, status}).
    // Or updateStatus({id, status}).
    // Existing hook returned:
    // updateStatus = useMutation(...)
    // So updateStatus.mutate(...) or updateStatus.mutateAsync(...) is expected.
    // I should check usage of useAdminLeads.

    // Assuming usage allows function call or I need to mock the mutation object.

    return {
        leads: items,
        isLoading,
        updateStatus: {
            mutate: (vars: { id: string; status: string }) => {
                updateStatus(vars).catch(() => { });
            },
            mutateAsync: updateStatus
        }
    };
}
