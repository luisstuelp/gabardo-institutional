/**
 * Favorites Redux slice.
 * Manages user's favorite vehicles.
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { favoritesApi } from '@/api';
import { createLogger } from '@/lib/logger';
import type { FavoriteRecord } from '@/types/vehicles';

const logger = createLogger('FavoritesSlice');

export interface FavoritesState {
    items: FavoriteRecord[];
    isLoading: boolean;
    error: string | null;
}

const initialState: FavoritesState = {
    items: [],
    isLoading: false,
    error: null,
};

/** Async thunk: Fetch favorites */
export const fetchFavorites = createAsyncThunk(
    'favorites/fetch',
    async (userId: string, { rejectWithValue }) => {
        logger.debug('Dispatching fetchFavorites', { userId });
        const result = await favoritesApi.getFavorites(userId);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data || [];
    }
);

/** Async thunk: Add favorite */
export const addFavorite = createAsyncThunk(
    'favorites/add',
    async ({ userId, vehicleId }: { userId: string; vehicleId: string }, { rejectWithValue }) => {
        logger.debug('Dispatching addFavorite', { userId, vehicleId });
        const result = await favoritesApi.addFavorite(userId, vehicleId);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data ?? { id: 'temp-' + Date.now(), vehicle_id: vehicleId }; // Fallback
    }
);

/** Async thunk: Remove favorite */
export const removeFavorite = createAsyncThunk(
    'favorites/remove',
    async ({ userId, vehicleId }: { userId: string; vehicleId: string }, { rejectWithValue }) => {
        logger.debug('Dispatching removeFavorite', { userId, vehicleId });
        const result = await favoritesApi.removeFavorite(userId, vehicleId);
        if (result.error) return rejectWithValue(result.error.message);
        return vehicleId;
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        clearFavorites(state) {
            state.items = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // fetch
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // add
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            // Avoid duplicates
            if (!state.items.find(f => f.vehicle_id === action.payload.vehicle_id)) {
                state.items.push(action.payload);
            }
        });

        // remove
        builder.addCase(removeFavorite.fulfilled, (state, action) => {
            state.items = state.items.filter(f => f.vehicle_id !== action.payload);
        });
    },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
