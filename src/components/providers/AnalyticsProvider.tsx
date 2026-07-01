'use client';

/**
 * AnalyticsProvider component.
 * Conditionally initializes Google Analytics, PostHog, and Chatwoot
 * based on the presence of their keys in environment variables.
 * If no key is provided, the service is disabled — no errors, no tracking.
 */
import { useEffect } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('AnalyticsProvider');

interface AnalyticsProviderProps {
    children: React.ReactNode;
}

/** Initialize Google Analytics if a measurement ID is provided */
function initGoogleAnalytics(measurementId: string): void {
    logger.info('Initializing Google Analytics', { measurementId });

    // Load the gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Configure gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId);
}

/** Initialize PostHog if a key is provided */
function initPostHog(key: string, host?: string): void {
    logger.info('Initializing PostHog', { host });

    const script = document.createElement('script');
    script.innerHTML = `
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('${key}', {api_host: '${host || 'https://app.posthog.com'}'});
  `;
    document.head.appendChild(script);
}

/** Initialize Chatwoot if a token is provided */
function initChatwoot(token: string, baseUrl?: string): void {
    logger.info('Initializing Chatwoot', { baseUrl });

    const url = baseUrl || 'https://app.chatwoot.com';

    const script = document.createElement('script');
    script.innerHTML = `
    (function(d,t) {
      var BASE_URL="${url}";
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g,s);
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: '${token}',
          baseUrl: BASE_URL
        })
      }
    })(document,"script");
  `;
    document.head.appendChild(script);
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
    useEffect(() => {
        // Google Analytics
        const gaId = process.env.NEXT_PUBLIC_TRUCKS_GA_MEASUREMENT_ID;
        if (gaId) {
            initGoogleAnalytics(gaId);
        } else {
            logger.debug('Google Analytics disabled (no NEXT_PUBLIC_TRUCKS_GA_MEASUREMENT_ID)');
        }

        // PostHog
        const posthogKey = process.env.NEXT_PUBLIC_TRUCKS_POSTHOG_KEY;
        if (posthogKey) {
            initPostHog(posthogKey, process.env.NEXT_PUBLIC_TRUCKS_POSTHOG_HOST);
        } else {
            logger.debug('PostHog disabled (no NEXT_PUBLIC_TRUCKS_POSTHOG_KEY)');
        }

        // Chatwoot
        const chatwootToken = process.env.NEXT_PUBLIC_TRUCKS_CHATWOOT_TOKEN;
        if (chatwootToken) {
            initChatwoot(chatwootToken, process.env.NEXT_PUBLIC_TRUCKS_CHATWOOT_BASE_URL);
        } else {
            logger.debug('Chatwoot disabled (no NEXT_PUBLIC_TRUCKS_CHATWOOT_TOKEN)');
        }
    }, []);

    return <>{children}</>;
}

// Extend Window interface for analytics globals
declare global {
    interface Window {
        dataLayer: unknown[];
        posthog: Record<string, unknown>;
        chatwootSDK: { run: (config: { websiteToken: string; baseUrl: string }) => void };
    }
}
