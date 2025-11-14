'use client';

import { useTrackPageView } from '@/hooks/usePageMetrics';

type PageMetricsTrackerProps = {
  enabled?: boolean;
};

export default function PageMetricsTracker({ enabled = true }: PageMetricsTrackerProps) {
  useTrackPageView({ enabled });
  return null;
}
