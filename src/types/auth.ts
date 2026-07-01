/**
 * Auth-related types for the Gabardo Trucks application.
 * All auth interfaces and type aliases live here.
 */
import type { User, Session } from '@supabase/supabase-js';

/** Shape of the AuthContext value provided to consumers */
export interface AuthContextType {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<AuthResult>;
    signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
    signOut: () => Promise<void>;
    changePassword: (newPassword: string) => Promise<AuthResult>;
    resetPasswordForEmail: (email: string) => Promise<AuthResult>;
}

/** Standard return shape for auth operations */
export interface AuthResult {
    error: Error | null;
}

/** Payload sent when signing up */
export interface SignUpPayload {
    email: string;
    password: string;
    fullName: string;
}

/** Payload sent when signing in */
export interface SignInPayload {
    email: string;
    password: string;
}

/** Redux auth state slice */
export interface AuthState {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}
