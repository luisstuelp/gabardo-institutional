type ContentType = 'post' | 'midia' | 'page';

export type MetricsEvent = 'view' | 'external_click' | 'share';

interface SendMetricsEventOptions {
  contentType: ContentType;
  contentId: string;
  event: MetricsEvent;
}

const METRICS_ENDPOINT = '/api/metrics';

export function sendMetricsEvent({ contentType, contentId, event }: SendMetricsEventOptions) {
  if (!contentId) {
    return;
  }

  const payload = JSON.stringify({ contentType, contentId, event });

  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(METRICS_ENDPOINT, blob);
      return;
    }
  } catch (error) {
    console.error('Failed to send beacon for metrics, falling back to fetch', error);
  }

  if (typeof window !== 'undefined') {
    fetch(METRICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      keepalive: true,
    }).catch((error) => {
      console.error('Failed to send metrics event', error);
    });
  }
}
