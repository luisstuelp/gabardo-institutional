/**
 * Vehicle-related types for the Gabardo Trucks application.
 * Extracted from hooks, components, and the database types.
 */
import type { Vehicle, VehicleImage, Lead, Branch, VehicleFilters, VehicleWithImages } from './database';

/** Result shape for paginated vehicle fetching (infinite scroll) */
export interface FetchVehiclesResult {
    vehicles: VehicleWithImages[];
    nextPage: number | null;
    totalCount: number;
}

/** A lead with its associated vehicle and images (for proposals page) */
export interface LeadWithVehicle extends Lead {
    vehicle: Vehicle & {
        images: VehicleImage[];
    };
}

/** Admin lead view — lead joined with minimal vehicle info */
export interface AdminLead extends Lead {
    vehicle: {
        title: string;
        slug: string;
    } | null;
}

/** Minimal favorite record returned from the database */
export interface FavoriteRecord {
    id: string;
    vehicle_id: string;
}

/** Props for the VehicleCard component */
export interface VehicleCardProps {
    vehicle: Vehicle;
    images?: VehicleImage[];
    isFavorite?: boolean;
    onToggleFavorite?: (vehicleId: string) => void;
    showFavoriteButton?: boolean;
}

/** Props for the ImageGallery component */
export interface ImageGalleryProps {
    images: VehicleImage[];
}

/** Props for the FinancingSimulator component */
export interface FinancingSimulatorProps {
    vehiclePrice: number;
}

/** Props for the VehicleImageManager component */
export interface VehicleImageManagerProps {
    vehicleId: string;
    images: VehicleImage[];
    onImagesChange: () => void;
}

/** Props for the VehicleForm component */
export interface VehicleFormProps {
    vehicleId?: string;
    initialData?: Partial<Vehicle>;
    onSuccess?: () => void;
}

/** Props for the FipeSearchDialog component */
export interface FipeSearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (fipeCode: string, fipeValue: number) => void;
}

/** Redux vehicles state slice */
export interface VehiclesState {
    items: VehicleWithImages[];
    selectedVehicle: VehicleWithImages | null;
    filters: VehicleFilters;
    sortBy: string;
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    currentPage: number;
    publicItems: VehicleWithImages[];
    publicPage: number;
    hasMore: boolean;
    isLoadingMore: boolean;
}
