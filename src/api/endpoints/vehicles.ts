/**
 * Vehicles API endpoint module.
 * RESTful interface for all vehicle operations.
 * Frontend components and Redux thunks call these functions — never Supabase directly.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { Vehicle, VehicleImage, VehicleFilters, Branch, VehicleWithImages } from '@/types/database';
import type { FetchVehiclesResult } from '@/types/vehicles';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('VehiclesAPI');
const ITEMS_PER_PAGE = 12;

/** GET /vehicles — List vehicles with filters, sorting, and pagination */
export async function getVehicles(
    filters: VehicleFilters = {},
    sortBy: string = 'recent',
    page: number = 0
): Promise<ApiResponse<FetchVehiclesResult>> {
    const client = getApiClient();
    logger.info('Fetching vehicles', { filters, sortBy, page });

    return client.query<FetchVehiclesResult>('getVehicles', async () => {
        const supabase = client.getSupabaseClient();
        let query = supabase
            .from('vehicles')
            .select('*, images:vehicle_images(*)', { count: 'exact' })
            .eq('status', 'available');

        // Apply filters
        if (filters.brand) query = query.ilike('brand', filters.brand);
        if (filters.model) query = query.ilike('model', `%${filters.model}%`);
        if (filters.yearMin) query = query.gte('year_model', filters.yearMin);
        if (filters.yearMax) query = query.lte('year_model', filters.yearMax);
        if (filters.priceMin) query = query.gte('price', filters.priceMin);
        if (filters.priceMax) query = query.lte('price', filters.priceMax);
        if (filters.fuel) query = query.eq('fuel', filters.fuel);
        if (filters.transmission) query = query.eq('transmission', filters.transmission);
        if (filters.isFeatured) query = query.eq('is_featured', true);
        if (filters.isSpecialOffer) query = query.eq('is_special_offer', true);
        if (filters.isSemiNew) query = query.eq('is_semi_new', true);
        if (filters.search) {
            query = query.or(
                `title.ilike.%${filters.search}%,model.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price_asc':
                query = query.order('price', { ascending: true });
                break;
            case 'price_desc':
                query = query.order('price', { ascending: false });
                break;
            case 'year_desc':
                query = query.order('year_model', { ascending: false });
                break;
            case 'mileage_asc':
                query = query.order('mileage', { ascending: true });
                break;
            default:
                query = query.order('created_at', { ascending: false });
        }

        // Apply pagination
        const from = page * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        const { data, count, error } = await query.range(from, to);

        if (error) return { data: null, error };

        const totalCount = count || 0;
        const hasMore = from + (data?.length || 0) < totalCount;

        return {
            data: {
                vehicles: (data as unknown as VehicleWithImages[]) || [],
                nextPage: hasMore ? page + 1 : null,
                totalCount,
            },
            error: null,
        };
    });
}

/** GET /vehicles/:slug — Get a single vehicle by slug */
export async function getVehicleBySlug(slug: string): Promise<ApiResponse<VehicleWithImages>> {
    const client = getApiClient();
    logger.info('Fetching vehicle by slug', { slug });

    return client.query<VehicleWithImages>('getVehicleBySlug', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('vehicles')
            .select('*, images:vehicle_images(*)')
            .eq('slug', slug)
            .single();

        return { data: data as unknown as VehicleWithImages | null, error };
    });
}

/** GET /vehicles/id/:id — Get a single vehicle by ID */
export async function getVehicleById(id: string): Promise<ApiResponse<VehicleWithImages>> {
    const client = getApiClient();
    logger.info('Fetching vehicle by ID', { id });

    return client.query<VehicleWithImages>('getVehicleById', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('vehicles')
            .select('*, images:vehicle_images(*)')
            .eq('id', id)
            .single();

        return { data: data as unknown as VehicleWithImages | null, error };
    });
}

/** GET /vehicles/:id/images — Get images for a vehicle */
export async function getVehicleImages(vehicleId: string): Promise<ApiResponse<VehicleImage[]>> {
    const client = getApiClient();
    logger.debug('Fetching vehicle images', { vehicleId });

    return client.query<VehicleImage[]>('getVehicleImages', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('vehicle_images')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('display_order');

        return { data: data as VehicleImage[] | null, error };
    });
}

/** GET /branches — Get all branches */
export async function getBranches(): Promise<ApiResponse<Branch[]>> {
    const client = getApiClient();
    logger.debug('Fetching branches');

    return client.query<Branch[]>('getBranches', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase.from('branches').select('*');
        return { data: data as Branch[] | null, error };
    });
}

/** POST /vehicles — Create a new vehicle (admin) */
export async function createVehicle(vehicle: Partial<Vehicle>): Promise<ApiResponse<VehicleWithImages>> {
    const client = getApiClient();
    logger.info('Creating vehicle', { title: vehicle.title });

    return client.query<VehicleWithImages>('createVehicle', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('vehicles')
            .insert(vehicle as never)
            .select('*, images:vehicle_images(*)')
            .single();

        return { data: data as VehicleWithImages | null, error };
    });
}

/** PUT /vehicles/:id — Update a vehicle (admin) */
export async function updateVehicle(
    id: string,
    updates: Partial<Vehicle>
): Promise<ApiResponse<VehicleWithImages>> {
    const client = getApiClient();
    logger.info('Updating vehicle', { id });

    return client.query<VehicleWithImages>('updateVehicle', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('vehicles')
            .update(updates as never)
            .eq('id', id)
            .select('*, images:vehicle_images(*)')
            .single();

        return { data: data as VehicleWithImages | null, error };
    });
}

/** DELETE /vehicles/:id — Delete a vehicle (admin) */
export async function deleteVehicle(id: string): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Deleting vehicle', { id });

    return client.query<null>('deleteVehicle', async () => {
        const supabase = client.getSupabaseClient();
        const { error } = await supabase.from('vehicles').delete().eq('id', id);
        return { data: null, error };
    });
}
