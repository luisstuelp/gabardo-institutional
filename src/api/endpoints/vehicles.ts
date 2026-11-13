/**
 * Vehicles API endpoint module.
 * RESTful interface for all vehicle operations.
 * Frontend components and Redux thunks call these functions — never Supabase directly.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { Vehicle, VehicleImage, VehicleFilters, Branch, VehicleWithImages, ListingType } from '@/types/database';
import type { FetchVehiclesResult } from '@/types/vehicles';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('VehiclesAPI');
const ITEMS_PER_PAGE = 50;

type CatalogVehicle = VehicleWithImages & { listing_type: ListingType; category?: string; condition?: string | null };

async function fetchCatalogRows(includeUnavailable: boolean): Promise<CatalogVehicle[]> {
    const supabase = getApiClient().getSupabaseClient() as any;
    const [trucksResult, vehiclesResult, equipmentResult] = await Promise.all([
        supabase.from('vehicles').select('*'),
        supabase.from('generic_vehicles').select('*'),
        supabase.from('equipment').select('*'),
    ]);
    const error = trucksResult.error || vehiclesResult.error || equipmentResult.error;
    if (error) throw error;

    const trucks = (trucksResult.data ?? []).map((row: any) => ({ ...row, listing_type: 'truck' as const }));
    const vehicles = (vehiclesResult.data ?? []).map((row: any) => ({ ...row, listing_type: 'vehicle' as const }));
    const equipment = (equipmentResult.data ?? []).map((row: any) => ({
        ...row,
        brand: row.brand || row.category || 'Equipamento',
        model: row.model || row.title,
        year_manufacture: row.year_manufacture || 0,
        year_model: row.year_model || 0,
        mileage: 0,
        fuel: 'diesel',
        transmission: 'manual',
        axle_config: null,
        power: null,
        color: null,
        fipe_code: null,
        fipe_value: null,
        is_special_offer: false,
        is_semi_new: false,
        is_single_owner: false,
        category: row.category,
        listing_type: 'equipment' as const,
    }));
    const rows: CatalogVehicle[] = [...trucks, ...vehicles, ...equipment]
        .filter((row) => includeUnavailable || row.status === 'available')
        .map((row) => ({ ...row, images: [] }));

    if (!rows.length) return rows;
    const ids = rows.map((row) => row.id);
    const [truckImages, vehicleImages, equipmentImages] = await Promise.all([
        supabase.from('vehicle_images').select('*').in('vehicle_id', ids),
        supabase.from('generic_vehicle_images').select('*').in('vehicle_id', ids),
        supabase.from('equipment_images').select('*').in('vehicle_id', ids),
    ]);
    const imageErrors = truckImages.error || vehicleImages.error || equipmentImages.error;
    if (imageErrors) throw imageErrors;
    const imageBuckets: Record<ListingType, VehicleImage[]> = {
        truck: truckImages.data ?? [],
        vehicle: vehicleImages.data ?? [],
        equipment: equipmentImages.data ?? [],
    };
    return rows.map((row) => ({
        ...row,
        images: (imageBuckets[row.listing_type] ?? []).filter((image) => image.vehicle_id === row.id),
    }));
}

function filterCatalogRows(rows: CatalogVehicle[], filters: VehicleFilters): CatalogVehicle[] {
    return rows.filter((row) => {
        if (filters.brand && row.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
        if (filters.model && !row.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
        if (filters.yearMin && row.year_model < filters.yearMin) return false;
        if (filters.yearMax && row.year_model > filters.yearMax) return false;
        if (filters.priceMin !== undefined && row.price < filters.priceMin) return false;
        if (filters.priceMax !== undefined && row.price > filters.priceMax) return false;
        if (filters.fuel && row.fuel !== filters.fuel) return false;
        if (filters.transmission && row.transmission !== filters.transmission) return false;
        if (filters.isFeatured && !row.is_featured) return false;
        if (filters.isSpecialOffer && !row.is_special_offer) return false;
        if (filters.isSemiNew && !row.is_semi_new) return false;
        if (filters.search) {
            const search = filters.search.toLowerCase();
            if (![row.title, row.brand, row.model, row.category ?? ''].some((value) => value.toLowerCase().includes(search))) return false;
        }
        return true;
    });
}

function sortCatalogRows(rows: CatalogVehicle[], sortBy: string): CatalogVehicle[] {
    const sorted = [...rows];
    switch (sortBy) {
        case 'price_asc': return sorted.sort((a, b) => a.price - b.price);
        case 'price_desc': return sorted.sort((a, b) => b.price - a.price);
        case 'year_desc': return sorted.sort((a, b) => b.year_model - a.year_model);
        case 'mileage_asc': return sorted.sort((a, b) => a.mileage - b.mileage);
        default: return sorted.sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
}

/** GET /vehicles — List vehicles with filters, sorting, and pagination */
export async function getVehicles(
    filters: VehicleFilters = {},
    sortBy: string = 'recent',
    page: number = 0,
    includeUnavailable = false,
): Promise<ApiResponse<FetchVehiclesResult>> {
    const client = getApiClient();
    logger.info('Fetching vehicles', { filters, sortBy, page });

    return client.query<FetchVehiclesResult>('getVehicles', async () => {
        const rows = sortCatalogRows(filterCatalogRows(await fetchCatalogRows(includeUnavailable), filters), sortBy);
        const from = page * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        const data = rows.slice(from, to + 1);
        const totalCount = rows.length;
        const hasMore = to + 1 < totalCount;

        return {
            data: {
                vehicles: data as unknown as VehicleWithImages[],
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
        const rows = await fetchCatalogRows(true);
        return { data: rows.find((row) => row.slug === slug) as VehicleWithImages | undefined ?? null, error: null };
    });
}

/** GET /vehicles/id/:id — Get a single vehicle by ID */
export async function getVehicleById(id: string): Promise<ApiResponse<VehicleWithImages>> {
    const client = getApiClient();
    logger.info('Fetching vehicle by ID', { id });

    return client.query<VehicleWithImages>('getVehicleById', async () => {
        const rows = await fetchCatalogRows(true);
        return { data: rows.find((row) => row.id === id) as VehicleWithImages | undefined ?? null, error: null };
    });
}

/** GET /vehicles/:id/images — Get images for a vehicle */
export async function getVehicleImages(vehicleId: string): Promise<ApiResponse<VehicleImage[]>> {
    const client = getApiClient();
    logger.debug('Fetching vehicle images', { vehicleId });

    return client.query<VehicleImage[]>('getVehicleImages', async () => {
        const supabase = client.getSupabaseClient() as any;
        const tables = ['vehicle_images', 'generic_vehicle_images', 'equipment_images'];
        const results = await Promise.all(tables.map((table) => supabase.from(table).select('*').eq('vehicle_id', vehicleId)));
        const error = results.find((result) => result.error)?.error;
        const data = results.flatMap((result) => result.data ?? []) as VehicleImage[];
        data.sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.display_order - b.display_order);
        return { data, error };
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

/** Convert an unselected optional branch into SQL NULL instead of an invalid empty UUID. */
function normalizeVehiclePayload(vehicle: Partial<Vehicle>): Partial<Vehicle> {
    if (typeof vehicle.branch_id !== 'string') {
        return vehicle;
    }

    const branchId = vehicle.branch_id.trim();
    return { ...vehicle, branch_id: branchId || null };
}

function prepareListingPayload(vehicle: Partial<Vehicle> & { category?: string; condition?: string | null }) {
    const { listing_type = 'truck', category, condition, ...rest } = vehicle;
    if (listing_type === 'equipment') {
        const equipmentFields = ['id', 'slug', 'title', 'brand', 'model', 'year_manufacture', 'year_model', 'price', 'description', 'specs', 'is_featured', 'status', 'branch_id'] as const;
        const payload = Object.fromEntries(equipmentFields.filter((key) => key in rest).map((key) => [key, rest[key]]));
        if (typeof payload.branch_id === 'string') payload.branch_id = payload.branch_id.trim() || null;
        return { listing_type, payload: { ...payload, category: category?.trim() || 'Equipamento', condition: condition || null } };
    }
    const payload = { ...rest, ...(listing_type === 'vehicle' ? { category: category?.trim() || 'Veículo' } : {}) };
    return { listing_type, payload: normalizeVehiclePayload(payload as Partial<Vehicle>) };
}

function listingTable(listingType: ListingType) {
    return listingType === 'vehicle' ? 'generic_vehicles' : listingType === 'equipment' ? 'equipment' : 'vehicles';
}

function normalizeListingRow(row: any, listingType: ListingType): VehicleWithImages {
    const common = listingType === 'equipment' ? {
        ...row,
        brand: row.brand || row.category || 'Equipamento',
        model: row.model || row.title,
        year_manufacture: row.year_manufacture || 0,
        year_model: row.year_model || 0,
        mileage: 0,
        fuel: 'diesel',
        transmission: 'manual',
        axle_config: null,
        power: null,
        color: null,
        fipe_code: null,
        fipe_value: null,
        is_special_offer: false,
        is_semi_new: false,
        is_single_owner: false,
    } : row;
    return { ...common, listing_type: listingType, images: [] } as VehicleWithImages;
}

/** POST /vehicles — Create a new vehicle (admin) */
export async function createVehicle(vehicle: Partial<Vehicle>): Promise<ApiResponse<VehicleWithImages>> {
    const client = getApiClient();
    logger.info('Creating vehicle', { title: vehicle.title });

    return client.query<VehicleWithImages>('createVehicle', async () => {
        const supabase = client.getSupabaseClient() as any;
        const { listing_type, payload } = prepareListingPayload(vehicle as Partial<Vehicle> & { category?: string; condition?: string | null });
        const { data, error } = await supabase
            .from(listingTable(listing_type))
            .insert(payload)
            .select('*')
            .single();

        return { data: data ? normalizeListingRow(data, listing_type) : null, error };
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
        const supabase = client.getSupabaseClient() as any;
        const { listing_type, payload } = prepareListingPayload(updates as Partial<Vehicle> & { category?: string; condition?: string | null });
        const { data, error } = await supabase
            .from(listingTable(listing_type))
            .update(payload)
            .eq('id', id)
            .select('*')
            .single();

        return { data: data ? normalizeListingRow(data, listing_type) : null, error };
    });
}

/** DELETE /vehicles/:id — Delete a vehicle (admin) */
export async function deleteVehicle(id: string, listingType: ListingType = 'truck'): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Deleting vehicle', { id });

    return client.query<null>('deleteVehicle', async () => {
        const supabase = client.getSupabaseClient() as any;
        const { error } = await supabase.from(listingTable(listingType)).delete().eq('id', id);
        return { data: null, error };
    });
}
