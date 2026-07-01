/**
 * Vehicles Redux slice.
 * Manages vehicle listing state: items, filters, sorting, pagination.
 */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { vehiclesApi } from '@/api';
import { createLogger } from '@/lib/logger';
import type { VehiclesState } from '@/types/vehicles';
import type { Vehicle, VehicleFilters } from '@/types/database';

const logger = createLogger('VehiclesSlice');

const initialState: VehiclesState = {
    items: [],
    selectedVehicle: null,
    filters: {},
    sortBy: 'recent',
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 0,
    publicItems: [],
    publicPage: 0,
    hasMore: true,
    isLoadingMore: false,
};

/** Async thunk: Fetch vehicles with filters */
export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async (
        { filters, sortBy, page }: { filters?: VehicleFilters; sortBy?: string; page?: number },
        { rejectWithValue }
    ) => {
        logger.info('Dispatching fetchVehicles', { filters, sortBy, page });
        const result = await vehiclesApi.getVehicles(filters, sortBy, page);
        if (result.error) {
            return rejectWithValue(result.error.message);
        }
        return result.data;
    }
);

/** Async thunk: Fetch public vehicles (infinite scroll) */
export const fetchPublicVehicles = createAsyncThunk(
    'vehicles/fetchPublic',
    async (
        { filters, sortBy, page }: { filters?: VehicleFilters; sortBy?: string; page: number },
        { rejectWithValue }
    ) => {
        logger.info('Dispatching fetchPublicVehicles', { filters, sortBy, page });
        const result = await vehiclesApi.getVehicles(filters, sortBy, page);
        if (result.error) {
            return rejectWithValue(result.error.message);
        }
        return { ...result.data, page };
    }
);

/** Async thunk: Fetch a single vehicle by slug */
export const fetchVehicleBySlug = createAsyncThunk(
    'vehicles/fetchBySlug',
    async (slug: string, { rejectWithValue }) => {
        logger.info('Dispatching fetchVehicleBySlug', { slug });
        const result = await vehiclesApi.getVehicleBySlug(slug);
        if (result.error) {
            return rejectWithValue(result.error.message);
        }
        return result.data;
    }
);

/** Async thunk: Fetch a single vehicle by ID */
export const fetchVehicleById = createAsyncThunk(
    'vehicles/fetchById',
    async (id: string, { rejectWithValue }) => {
        logger.info('Dispatching fetchVehicleById', { id });
        const result = await vehiclesApi.getVehicleById(id);
        if (result.error) {
            return rejectWithValue(result.error.message);
        }
        return result.data;
    }
);

/** Async thunk: Create a vehicle (admin) */
export const createVehicle = createAsyncThunk(
    'vehicles/create',
    async (vehicle: Partial<Vehicle>, { rejectWithValue }) => {
        logger.info('Dispatching createVehicle');
        const result = await vehiclesApi.createVehicle(vehicle);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

/** Async thunk: Update a vehicle (admin) */
export const updateVehicle = createAsyncThunk(
    'vehicles/update',
    async ({ id, updates }: { id: string; updates: Partial<Vehicle> }, { rejectWithValue }) => {
        logger.info('Dispatching updateVehicle', { id });
        const result = await vehiclesApi.updateVehicle(id, updates);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

/** Async thunk: Delete a vehicle (admin) */
export const deleteVehicle = createAsyncThunk(
    'vehicles/delete',
    async (id: string, { rejectWithValue }) => {
        logger.info('Dispatching deleteVehicle', { id });
        const result = await vehiclesApi.deleteVehicle(id);
        if (result.error) return rejectWithValue(result.error.message);
        return id;
    }
);

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<VehicleFilters>) {
            state.filters = action.payload;
            state.currentPage = 0;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
            state.currentPage = 0;
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        resetPublicList(state) {
            state.publicItems = [];
            state.publicPage = 0;
            state.hasMore = true;
        },
        clearSelectedVehicle(state) {
            state.selectedVehicle = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // fetchVehicles
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.items = action.payload.vehicles;
                    state.totalCount = action.payload.totalCount;
                }
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // fetchPublicVehicles
        builder
            .addCase(fetchPublicVehicles.pending, (state, action) => {
                if (action.meta.arg.page === 0) {
                    state.isLoading = true;
                } else {
                    state.isLoadingMore = true;
                }
                state.error = null;
            })
            .addCase(fetchPublicVehicles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoadingMore = false;
                if (action.payload) {
                    const newVehicles = action.payload.vehicles;
                    if (action.payload.page === 0) {
                        state.publicItems = newVehicles;
                    } else {
                        // Append uniquely
                        const existingIds = new Set(state.publicItems.map(v => v.id));
                        const uniqueNew = newVehicles.filter(v => !existingIds.has(v.id));
                        state.publicItems = [...state.publicItems, ...uniqueNew];
                    }

                    state.publicPage = action.payload.page;
                    state.totalCount = action.payload.totalCount;
                    // Check if more
                    state.hasMore = action.payload.nextPage !== null;
                }
            })
            .addCase(fetchPublicVehicles.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoadingMore = false;
                state.error = action.payload as string;
            });

        // fetchVehicleBySlug
        builder
            .addCase(fetchVehicleBySlug.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVehicleBySlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedVehicle = action.payload ?? null;
            })
            .addCase(fetchVehicleBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // fetchVehicleById
        builder
            .addCase(fetchVehicleById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchVehicleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedVehicle = action.payload ?? null;
            })
            .addCase(fetchVehicleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // createVehicle
        builder.addCase(createVehicle.fulfilled, (state, action) => {
            if (action.payload) {
                state.items.unshift(action.payload);
                state.totalCount += 1;
            }
        });

        // updateVehicle
        builder.addCase(updateVehicle.fulfilled, (state, action) => {
            if (action.payload) {
                const index = state.items.findIndex((v) => v.id === action.payload!.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.selectedVehicle?.id === action.payload.id) {
                    state.selectedVehicle = action.payload;
                }
            }
        });

        // deleteVehicle
        builder.addCase(deleteVehicle.fulfilled, (state, action) => {
            state.items = state.items.filter((v) => v.id !== action.payload);
            state.totalCount -= 1;
        });
    },
});

export const { setFilters, setSortBy, setPage, clearSelectedVehicle, clearError, resetPublicList } =
    vehiclesSlice.actions;
export default vehiclesSlice.reducer;
