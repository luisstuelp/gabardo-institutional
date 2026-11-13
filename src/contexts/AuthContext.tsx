'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { TrucksUser } from '@/lib/trucksUserAuth';

interface AuthContextType {
  user: TrucksUser | null;
  session: { user: TrucksUser } | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (fullName: string, email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TrucksUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/trucks/auth/session', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as { user: TrucksUser | null };
      })
      .then((data) => {
        if (isMounted) setUser(data?.user ?? null);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/trucks/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        user?: TrucksUser;
        error?: string;
      };

      if (!response.ok || !result.user) {
        return { error: new Error(result.error ?? 'Não foi possível fazer login.') };
      }

      setUser(result.user);
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Não foi possível fazer login.') };
    }
  }, []);

  const signUp = useCallback(async (fullName: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/trucks/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        user?: { id: string; email: string; full_name: string | null };
        error?: string;
      };
      if (!response.ok || !result.user) {
        return { error: new Error(result.error ?? 'Não foi possível criar sua conta.') };
      }
      setUser({
        ...result.user,
        user_metadata: { full_name: result.user.full_name },
      });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Não foi possível criar sua conta.') };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/trucks/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    session: user ? { user } : null,
    isLoading,
    signIn,
    signUp,
    signOut,
  }), [user, isLoading, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
