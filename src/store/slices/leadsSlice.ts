/**
 * Leads Redux slice.
 * Manages admin leads state.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { leadsApi } from '@/api'; // utilizing existing api/endpoints/leads.ts (step 852 confirms existence)
import { createLogger } from '@/lib/logger';
import type { AdminLead } from '@/types/vehicles'; // Using AdminLead from types/vehicles

const logger = createLogger('LeadsSlice');

export interface LeadsState {
    items: AdminLead[];
    isLoading: boolean;
    error: string | null;
}

const initialState: LeadsState = {
    items: [],
    isLoading: false,
    error: null,
};

/** Async thunk: Fetch leads */
export const fetchLeads = createAsyncThunk(
    'leads/fetch',
    async (_, { rejectWithValue }) => {
        logger.debug('Dispatching fetchLeads');
        const result = await leadsApi.getAdminLeads();
        if (result.error) return rejectWithValue(result.error.message);
        return result.data || [];
    }
);

/** Async thunk: Update lead status */
export const updateLeadStatus = createAsyncThunk(
    'leads/updateStatus',
    async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
        logger.debug('Dispatching updateLeadStatus', { id, status });
        const result = await leadsApi.updateLeadStatus(id, status);
        if (result.error) return rejectWithValue(result.error.message);
        return { id, status };
    }
);

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // update status
        builder.addCase(updateLeadStatus.fulfilled, (state, action) => {
            const lead = state.items.find((l) => l.id === action.payload.id);
            if (lead) {
                lead.status = action.payload.status;
            }
        });
    },
});

export default leadsSlice.reducer;
