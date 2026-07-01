/**
 * ThemeProvider component.
 * Applies the default light theme CSS custom properties to the document root.
 * Enforces light mode by removing the 'dark' class.
 */
import { useEffect } from 'react';
import { createLogger } from '@/lib/logger';
import type { ThemeColors } from '@/types/theme';

const logger = createLogger('ThemeProvider');

/** Default light theme colors */
const defaultLightColors: ThemeColors = {
    primary: '222.2 47.4% 11.2%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '210 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    muted: '210 40% 96.1%',
    mutedForeground: '215.4 16.3% 46.9%',
    card: '0 0% 100%',
    cardForeground: '222.2 84% 4.9%',
    border: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
};

/** Map ThemeColors keys to CSS custom property names */
const COLOR_TO_CSS_VAR: Record<keyof ThemeColors, string> = {
    primary: '--primary',
    primaryForeground: '--primary-foreground',
    secondary: '--secondary',
    secondaryForeground: '--secondary-foreground',
    accent: '--accent',
    accentForeground: '--accent-foreground',
    background: '--background',
    foreground: '--foreground',
    muted: '--muted',
    mutedForeground: '--muted-foreground',
    card: '--card',
    cardForeground: '--card-foreground',
    border: '--border',
    ring: '--ring',
    destructive: '--destructive',
    destructiveForeground: '--destructive-foreground',
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Enforce light mode and apply colors
    useEffect(() => {
        const root = document.documentElement;

        // Always remove dark class
        root.classList.remove('dark');

        // Apply CSS variables
        for (const [key, cssVar] of Object.entries(COLOR_TO_CSS_VAR)) {
            const value = defaultLightColors[key as keyof ThemeColors];
            if (value) {
                root.style.setProperty(cssVar, value);
            }
        }

        logger.debug('Applied light theme colors');
    }, []);

    return <>{children}</>;
}
