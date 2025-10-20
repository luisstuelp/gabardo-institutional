'use client';

import { useEffect } from 'react';
import { reportWebVitals, observePerformance } from '@/lib/web-vitals';

/**
 * Performance Monitor Component
 * Initializes Web Vitals tracking and performance observes
 * Place in root layout for site-wide monitoring
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Initialize Web Vitals reporting
    reportWebVitals();
    
    // Set up performance observers
    observePerformance();
    
    // Log initial page load metrics
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('[Performance] Page Load Metrics:', {
          'Total Load Time': `${pageLoadTime}ms`,
          'Connect Time': `${connectTime}ms`,
          'Render Time': `${renderTime}ms`,
        });
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
