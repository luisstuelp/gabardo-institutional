'use client';

import { useCallback, useEffect, useState } from 'react';

type ConsentStatus = 'accepted' | 'rejected' | 'unknown';

const STORAGE_KEY = 'gabardo-cookie-consent';

export const useCookieConsent = () => {
  const [status, setStatus] = useState<ConsentStatus>('unknown');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    if (stored === 'accepted' || stored === 'rejected') {
      setStatus(stored);
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setStatus('accepted');
    setIsVisible(false);
  }, []);

  const rejectCookies = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, 'rejected');
    setStatus('rejected');
    setIsVisible(false);
  }, []);

  return {
    status,
    isVisible,
    acceptCookies,
    rejectCookies,
  };
};
