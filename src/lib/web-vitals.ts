/**
 * Development-only Web Vitals diagnostics.
 * Production collection is handled by @vercel/speed-insights in the root layout.
 */

import type { ReportHandler, WebVitalsMetric } from 'web-vitals';

// Log metrics to console in development
function logMetric(metric: WebVitalsMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: `${metric.value.toFixed(2)}ms`,
      rating: metric.rating,
    });
  }
}

// Report all available web vitals using built-in APIs
export function reportWebVitals() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  try {
    // Use dynamic import for web-vitals if available
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        const handleMetric: ReportHandler = (metric) => {
          logMetric(metric);
        };

        getCLS(handleMetric);
        getFID(handleMetric);
        getFCP(handleMetric);
        getLCP(handleMetric);
        getTTFB(handleMetric);
      })
      .catch(() => {
        console.warn('[Web Vitals] Development diagnostics could not be loaded.');
      });
  } catch (err) {
    console.error('[Web Vitals] Error reporting metrics:', err);
  }
}

// Performance observer for custom metrics
export function observePerformance() {
  if (
    typeof window === 'undefined' ||
    process.env.NODE_ENV !== 'development' ||
    !('PerformanceObserver' in window)
  ) {
    return;
  }

  try {
    // Observe long tasks (> 50ms)
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Performance] Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

    // Observe resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Log slow resources in development
        if (process.env.NODE_ENV === 'development' && resourceEntry.duration > 1000) {
          console.warn('[Performance] Slow resource:', {
            name: resourceEntry.name,
            duration: resourceEntry.duration,
            type: resourceEntry.initiatorType,
          });
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (err) {
    console.error('[Performance] Error setting up observers:', err);
  }
}
