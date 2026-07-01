import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';
import { useAuth } from '@/contexts/AuthContext';
import { Lead, Vehicle, VehicleImage } from '@/types/database';

interface LeadWithVehicle extends Lead {
    vehicle: Vehicle & {
        images: VehicleImage[];
    };
}

export function useProposals() {
    const { user } = useAuth();

    const { data: proposals = [], isLoading } = useQuery({
        queryKey: ['proposals', user?.id],
        queryFn: async () => {
            if (!user) return [];

            const { data, error } = await supabase
                .from('leads')
                .select(`
          *,
          vehicle:vehicles(
            *,
            images:vehicle_images(*)
          )
        `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching proposals:', error);
                return [];
            }

            return data as LeadWithVehicle[];
        },
        enabled: !!user,
    });

    return {
        proposals,
        isLoading,
        isAuthenticated: !!user,
    };
}
