/**
 * API layer types for the Gabardo Trucks application.
 * Used by the stateless API client and all endpoint modules.
 */

/** Standard API response wrapper */
export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    status: number;
}

/** Standard API error shape */
export interface ApiError {
    message: string;
    code: string;
    details?: string;
    hint?: string;
}

/** Paginated API response */
export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

/** API request options for the base client */
export interface ApiRequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    body?: unknown;
    params?: Record<string, string | number | boolean | undefined>;
    headers?: Record<string, string>;
}

/** Configuration for the API client */
export interface ApiClientConfig {
    baseUrl: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    getAccessToken: () => Promise<string | null>;
}

/** Log level for the logger */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/** A structured log entry */
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    module: string;
    message: string;
    data?: Record<string, unknown>;
    error?: Error;
}
