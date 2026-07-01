/**
 * Auth Redux slice.
 * Manages authentication state: user, session, loading, and error.
 * All auth operations go through the auth API endpoints.
 */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@/api';
import { createLogger } from '@/lib/logger';
import type { AuthState } from '@/types/auth';
import type { User, Session } from '@supabase/supabase-js';

const logger = createLogger('AuthSlice');

const initialState: AuthState = {
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
};

/** Async thunk: Sign in with email/password */
export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        logger.info('Dispatching signIn', { email });
        const result = await authApi.signIn(email, password);
        if (result.error) {
            logger.error('signIn failed', new Error(result.error.message));
            return rejectWithValue(result.error.message);
        }
        return result.data;
    }
);

/** Async thunk: Sign up with email/password/name */
export const signUp = createAsyncThunk(
    'auth/signUp',
    async (
        { email, password, fullName }: { email: string; password: string; fullName: string },
        { rejectWithValue }
    ) => {
        logger.info('Dispatching signUp', { email, fullName });
        const result = await authApi.signUp(email, password, fullName);
        if (result.error) {
            logger.error('signUp failed', new Error(result.error.message));
            return rejectWithValue(result.error.message);
        }
        return result.data;
    }
);

/** Async thunk: Sign out */
export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        logger.info('Dispatching signOut');
        const result = await authApi.signOut();
        if (result.error) {
            logger.error('signOut failed', new Error(result.error.message));
            return rejectWithValue(result.error.message);
        }
    }
);

/** Async thunk: Change password */
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (newPassword: string, { rejectWithValue }) => {
        logger.info('Dispatching changePassword');
        const result = await authApi.changePassword(newPassword);
        if (result.error) {
            return rejectWithValue(result.error.message);
        }
    }
);

/** Async thunk: Reset password for email */
export const resetPasswordForEmail = createAsyncThunk(
    'auth/resetPasswordForEmail',
    async (email: string, { rejectWithValue }) => {
        logger.info('Dispatching resetPasswordForEmail', { email });
        const result = await authApi.resetPasswordForEmail(email);
        if (result.error) {
            return rejectWithValue(result.error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /** Called by the auth state listener to sync session changes */
        setSession(state, action: PayloadAction<{ user: User | null; session: Session | null }>) {
            state.user = action.payload.user;
            state.session = action.payload.session;
            state.isAuthenticated = !!action.payload.user;
            state.isLoading = false;
            state.error = null;
        },
        /** Clear auth error */
        clearError(state) {
            state.error = null;
        },
        /** Set loading state */
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        // signIn
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.user ?? null;
                state.session = action.payload?.session ?? null;
                state.isAuthenticated = !!action.payload?.user;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // signUp
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.user ?? null;
                state.session = action.payload?.session ?? null;
                state.isAuthenticated = !!action.payload?.user;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // signOut
        builder
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
                state.session = null;
                state.isAuthenticated = false;
                state.error = null;
            });

        // changePassword
        builder
            .addCase(changePassword.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // resetPasswordForEmail
        builder
            .addCase(resetPasswordForEmail.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setSession, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
