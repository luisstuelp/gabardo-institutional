/**
 * Auth-related types for the Gabardo Trucks application.
 * All auth interfaces and type aliases live here.
 */
import type { TrucksUser } from '@/lib/trucksUserAuth';

/** Shape of the AuthContext value provided to consumers */
export interface AuthContextType {
    user: TrucksUser | null;
    session: { user: TrucksUser } | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<AuthResult>;
    signOut: () => Promise<void>;
    changePassword: (newPassword: string) => Promise<AuthResult>;
    resetPasswordForEmail: (email: string) => Promise<AuthResult>;
}

/** Standard return shape for auth operations */
export interface AuthResult {
    error: Error | null;
}

/** Payload sent when signing in */
export interface SignInPayload {
    email: string;
    password: string;
}

/** Redux auth state slice */
export interface AuthState {
    user: TrucksUser | null;
    session: { user: TrucksUser } | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}
