'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Layout } from '@/components/layout/Layout_trucks';

interface TrucksPageShellProps {
  children: ReactNode;
  withLayout?: boolean;
}

export default function TrucksPageShell({ children, withLayout = true }: TrucksPageShellProps) {
  const content = withLayout ? <Layout>{children}</Layout> : children;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AnalyticsProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="trucks-scope">{content}</div>
            </TooltipProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </ThemeProvider>
    </Provider>
  );
}
