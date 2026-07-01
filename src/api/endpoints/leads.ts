/**
 * Leads API endpoint module.
 * RESTful interface for lead/proposal operations.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { Lead } from '@/types/database';
import type { LeadWithVehicle, AdminLead } from '@/types/vehicles';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('LeadsAPI');

/** POST /leads — Create a new lead (contact request) */
export async function createLead(
    lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<Lead>> {
    const client = getApiClient();
    logger.info('Creating lead', { name: lead.name, vehicleId: lead.vehicle_id });

    return client.query<Lead>('createLead', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('leads')
            .insert(lead)
            .select()
            .single();

        return { data: data as Lead | null, error };
    });
}

/** GET /leads/user/:userId — Get leads for a specific user (proposals) */
export async function getUserLeads(userId: string): Promise<ApiResponse<LeadWithVehicle[]>> {
    const client = getApiClient();
    logger.info('Fetching user leads', { userId });

    return client.query<LeadWithVehicle[]>('getUserLeads', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('leads')
            .select(`
        *,
        vehicle:vehicles(
          *,
          images:vehicle_images(*)
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        return { data: data as LeadWithVehicle[] | null, error };
    });
}

/** GET /leads (admin) — Get all leads with vehicle info */
export async function getAdminLeads(): Promise<ApiResponse<AdminLead[]>> {
    const client = getApiClient();
    logger.info('Fetching admin leads');

    return client.query<AdminLead[]>('getAdminLeads', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('leads')
            .select(`
        *,
        vehicle:vehicles(title, slug)
      `)
            .order('created_at', { ascending: false });

        return { data: data as AdminLead[] | null, error };
    });
}

/** PATCH /leads/:id/status — Update lead status (admin) */
export async function updateLeadStatus(
    id: string,
    status: string
): Promise<ApiResponse<Lead>> {
    const client = getApiClient();
    logger.info('Updating lead status', { id, status });

    return client.query<Lead>('updateLeadStatus', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        return { data: data as Lead | null, error };
    });
}
