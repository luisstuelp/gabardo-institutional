import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { sendMetricsEvent } from '@/lib/metrics';
import { normalizeTrackedPath, trackedSitePathSet } from '@/data/trackedSitePages';

interface UseTrackPageViewOptions {
  enabled?: boolean;
  allowUnlisted?: boolean;
  overrideContentId?: string;
}

export function useTrackPageView({ enabled = true, allowUnlisted = false, overrideContentId }: UseTrackPageViewOptions = {}) {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !pathname) {
      return;
    }

    const normalizedPath = normalizeTrackedPath(pathname);

    if (!allowUnlisted && !trackedSitePathSet.has(normalizedPath)) {
      return;
    }

    if (lastTrackedPath.current === normalizedPath) {
      return;
    }

    sendMetricsEvent({
      contentType: 'page',
      contentId: overrideContentId ?? normalizedPath,
      event: 'view',
    });

    lastTrackedPath.current = normalizedPath;
  }, [allowUnlisted, enabled, overrideContentId, pathname]);
}
