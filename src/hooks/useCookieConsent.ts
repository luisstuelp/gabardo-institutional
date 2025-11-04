'use client';

import { useContext } from 'react';

import { CookieConsentContext } from '@/components/providers/CookieConsentProvider';

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }

  return context;
};
