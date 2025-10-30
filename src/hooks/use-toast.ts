'use client';

import { useCallback } from 'react';

type ToastVariant = 'default' | 'destructive';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

export function useToast() {
  const toast = useCallback(({ title, description }: ToastOptions) => {
    const message = [title, description].filter(Boolean).join('\n');

    if (typeof window === 'undefined') {
      if (message.length > 0) {
        console.log(`[toast] ${message}`);
      }
      return;
    }

    if (message.length > 0) {
      window.alert(message);
    }
  }, []);

  return { toast };
}
