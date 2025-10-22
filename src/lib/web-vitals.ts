/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals and custom performance metrics
 * 
 * To enable full Web Vitals tracking, install the web-vitals package:
 * npm install web-vitals
 */

interface WebVitalMetric {
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

// Send metrics to analytics endpoint
function sendToAnalytics(metric: WebVitalMetric) {
  const body = JSON.stringify(metric);
  
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', body);
  }
}

// Log metrics to console in development
function logMetric(metric: WebVitalMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: `${metric.value.toFixed(2)}ms`,
      rating: metric.rating,
    });
  }
}

// Report all available web vitals using built-in APIs
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    // Use dynamic import for web-vitals if available
    // @ts-expect-error - web-vitals is optional dependency
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric: any) => {
          logMetric(metric);
          sendToAnalytics(metric);
        });
        
        getFID((metric: any) => {
          logMetric(metric);
          sendToAnalytics(metric);
        });
        
        getFCP((metric: any) => {
          logMetric(metric);
          sendToAnalytics(metric);
        });
        
        getLCP((metric: any) => {
          logMetric(metric);
          sendToAnalytics(metric);
        });
        
        getTTFB((metric: any) => {
          logMetric(metric);
          sendToAnalytics(metric);
        });
      })
      .catch(() => {
        // Fallback to basic performance metrics if web-vitals is not installed
        if (process.env.NODE_ENV === 'development') {
          console.log('[Web Vitals] Package not installed. Install with: npm install web-vitals');
        }
      });
  } catch (err) {
    console.error('[Web Vitals] Error reporting metrics:', err);
  }
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
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
