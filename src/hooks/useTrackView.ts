import { useEffect, useRef } from 'react';
import { sendMetricsEvent, type MetricsEvent } from '@/lib/metrics';

interface UseTrackViewOptions {
  contentType: 'post' | 'midia';
  contentId: string;
  enabled?: boolean;
}

export function useTrackView({ contentType, contentId, enabled = true }: UseTrackViewOptions) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!enabled || !contentId || hasTracked.current) {
      return;
    }

    // Track view after a short delay to ensure it's not a bounce
    const timer = setTimeout(() => {
      sendMetricsEvent({
        contentType,
        contentId,
        event: 'view',
      });
      hasTracked.current = true;
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [contentType, contentId, enabled]);
}

export function trackMetricEvent(
  contentType: 'post' | 'midia',
  contentId: string,
  event: MetricsEvent
) {
  sendMetricsEvent({ contentType, contentId, event });
}
