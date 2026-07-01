/**
 * Vitest test setup file.
 * Extends matchers with @testing-library/jest-dom and provides mock globals.
 */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock process.env for Next-compatible trucks keys
process.env.NODE_ENV = 'development';
process.env.NEXT_PUBLIC_TRUCKS_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_TRUCKS_SUPABASE_PUBLISHABLE_KEY = 'test-key';

// Mock window.matchMedia (used by theme system)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

// Suppress console errors in tests unless explicitly expected
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('Warning:')) return;
  originalConsoleError.call(console, ...args);
};
