/**
 * Users Redux slice.
 * Manages admin users state.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersApi from '@/api/endpoints/users';
import { createLogger } from '@/lib/logger';
import type { AdminUser } from '@/api/endpoints/users';
import type { AppRole } from '@/types/database';

const logger = createLogger('UsersSlice');

export interface UsersState {
    items: AdminUser[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    items: [],
    isLoading: false,
    error: null,
};

/** Async thunk: Fetch users */
export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, { rejectWithValue }) => {
        logger.debug('Dispatching fetchUsers');
        const result = await usersApi.getUsers();
        if (result.error) return rejectWithValue(result.error.message);
        return result.data || [];
    }
);

/** Async thunk: Update user role */
export const updateUserRole = createAsyncThunk(
    'users/updateRole',
    async ({ userId, role }: { userId: string; role: AppRole }, { rejectWithValue }) => {
        logger.debug('Dispatching updateUserRole', { userId, role });
        const result = await usersApi.updateUserRole(userId, role);
        if (result.error) return rejectWithValue(result.error.message);
        return { userId, role };
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // update role
        builder.addCase(updateUserRole.fulfilled, (state, action) => {
            const user = state.items.find(u => u.user_id === action.payload.userId);
            if (user) {
                user.role = action.payload.role;
            }
        });
    },
});

export default usersSlice.reducer;
