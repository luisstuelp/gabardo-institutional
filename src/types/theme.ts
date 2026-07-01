/**
 * Theme-related types for the Gabardo Trucks application.
 * Used by the ThemeContext and dark/light mode switcher.
 */

/** Available theme modes */
export type ThemeMode = 'light' | 'dark' | 'system';

/** Standardized theme color variables that users can customize */
export interface ThemeColors {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    card: string;
    cardForeground: string;
    border: string;
    ring: string;
    destructive: string;
    destructiveForeground: string;
}

/** A complete theme definition */
export interface ThemeDefinition {
    name: string;
    mode: ThemeMode;
    colors: ThemeColors;
}

/** Shape of the ThemeContext value */
export interface ThemeContextType {
    mode: ThemeMode;
    resolvedMode: 'light' | 'dark';
    setMode: (mode: ThemeMode) => void;
    colors: ThemeColors;
    setColors: (colors: Partial<ThemeColors>) => void;
    applyTheme: (theme: ThemeDefinition) => void;
}

/** Redux theme state slice */
export interface ThemeState {
    mode: ThemeMode;
    resolvedMode: 'light' | 'dark';
    colors: ThemeColors;
}
