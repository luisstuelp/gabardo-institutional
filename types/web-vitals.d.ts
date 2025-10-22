declare module "web-vitals" {
  export type WebVitalsRating = "good" | "needs-improvement" | "poor";

  export interface WebVitalsMetric {
    name: string;
    value: number;
    delta: number;
    id: string;
    entries: PerformanceEntry[];
    rating: WebVitalsRating;
    navigationType?: "navigate" | "reload" | "back-forward" | "prerender";
  }

  export type ReportHandler = (metric: WebVitalsMetric) => void;

  export function getCLS(onReport: ReportHandler): void;
  export function getFID(onReport: ReportHandler): void;
  export function getFCP(onReport: ReportHandler): void;
  export function getLCP(onReport: ReportHandler): void;
  export function getTTFB(onReport: ReportHandler): void;
}
