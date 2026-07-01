/**
 * Redux store configuration for the Gabardo Trucks application.
 * Singleton store instance with typed hooks for dispatch and selector.
 */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import vehiclesReducer from './slices/vehiclesSlice';
import chatReducer from './slices/chatSlice';
// import themeReducer from './slices/themeSlice'; // Removed
import uiReducer from './slices/uiSlice';
import favoritesReducer from './slices/favoritesSlice';
import leadsReducer from './slices/leadsSlice';
import analyticsReducer from './slices/analyticsSlice';
import usersReducer from './slices/usersSlice';

/** Configure and create the Redux store (singleton) */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        vehicles: vehiclesReducer,
        chat: chatReducer,
        // theme: themeReducer, // Removed
        ui: uiReducer,
        favorites: favoritesReducer,
        leads: leadsReducer,
        analytics: analyticsReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Supabase User/Session objects are not serializable
            serializableCheck: {
                ignoredActions: ['auth/setSession', 'auth/signIn/fulfilled', 'auth/signUp/fulfilled'],
                ignoredPaths: ['auth.user', 'auth.session'],
            },
        }),
    devTools: process.env.NODE_ENV === 'development',
});

/** Root state type inferred from the store */
export type RootState = ReturnType<typeof store.getState>;

/** Dispatch type inferred from the store */
export type AppDispatch = typeof store.dispatch;

/** Typed useDispatch hook — use this instead of plain useDispatch */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typed useSelector hook — use this instead of plain useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
