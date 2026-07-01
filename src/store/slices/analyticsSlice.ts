/**
 * Analytics Redux slice.
 * Manages dashboard statistics state.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as analyticsApi from '@/api/endpoints/analytics';
import { createLogger } from '@/lib/logger';
import type { DashboardStats, DashboardPeriod } from '@/api/endpoints/analytics';

const logger = createLogger('AnalyticsSlice');

export interface AnalyticsState {
    stats: DashboardStats | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    stats: null,
    isLoading: false,
    error: null,
};

/** Async thunk: Fetch dashboard stats */
export const fetchDashboardStats = createAsyncThunk(
    'analytics/fetchStats',
    async (period: DashboardPeriod | undefined, { rejectWithValue }) => {
        logger.debug(`Dispatching fetchDashboardStats with period: ${period}`);
        const result = await analyticsApi.getDashboardStats(period);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload ?? null;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default analyticsSlice.reducer;
