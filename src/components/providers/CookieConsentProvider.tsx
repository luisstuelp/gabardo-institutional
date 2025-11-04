'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ConsentStatus = 'accepted' | 'rejected' | 'unknown';

type CookieConsentContextValue = {
  status: ConsentStatus;
  isVisible: boolean;
  acceptCookies: () => void;
  rejectCookies: () => void;
  openPreferences: () => void;
};

const STORAGE_KEY = 'gabardo-cookie-consent';

export const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

function safeGetStoredConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    return stored === 'accepted' || stored === 'rejected' ? stored : null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CookieConsent] Unable to read storage:', error);
    }
    return null;
  }
}

function safeSetStoredConsent(value: ConsentStatus) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CookieConsent] Unable to persist choice:', error);
    }
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>('unknown');
  const [isVisible, setIsVisible] = useState(false);

  const initializeConsent = useCallback(() => {
    const stored = safeGetStoredConsent();

    if (stored) {
      setStatus(stored);
      setIsVisible(false);
      return;
    }

    setStatus('unknown');
    setIsVisible(true);
  }, []);

  useEffect(() => {
    initializeConsent();
  }, [initializeConsent]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const next = (event.newValue as ConsentStatus | null) ?? 'unknown';

      if (next === 'accepted' || next === 'rejected') {
        setStatus(next);
        setIsVisible(false);
      } else {
        setStatus('unknown');
        setIsVisible(true);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persistStatus = useCallback((nextStatus: ConsentStatus) => {
    safeSetStoredConsent(nextStatus);
    setStatus(nextStatus);
    setIsVisible(false);
  }, []);

  const acceptCookies = useCallback(() => {
    persistStatus('accepted');
  }, [persistStatus]);

  const rejectCookies = useCallback(() => {
    persistStatus('rejected');
  }, [persistStatus]);

  const openPreferences = useCallback(() => {
    setIsVisible(true);
  }, []);

  const value = useMemo(
    () => ({
      status,
      isVisible,
      acceptCookies,
      rejectCookies,
      openPreferences,
    }),
    [status, isVisible, acceptCookies, rejectCookies, openPreferences],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}
