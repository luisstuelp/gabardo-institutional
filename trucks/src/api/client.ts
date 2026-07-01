/**
 * Stateless API client for the Gabardo Trucks application.
 * All frontend components and Redux thunks communicate through this layer.
 * This client talks to Supabase (and eventually edge functions) — the frontend never talks directly to DB.
 *
 * Pattern: Singleton instance per app, retrieved via `getApiClient()`.
 */
import { supabase } from '@/integrations/supabase_trucks/client';
import { createLogger } from '@/lib/logger';
import type { ApiResponse, ApiError } from '@/types/api';

const logger = createLogger('ApiClient');

/**
 * Singleton API client class.
 * All data access goes through this layer.
 */
class ApiClient {
    private static instance: ApiClient | null = null;

    private constructor() {
        logger.info('ApiClient initialized');
    }

    /** Get the singleton instance */
    static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    /**
     * Get the current access token from the Supabase session.
     */
    private async getAccessToken(): Promise<string | null> {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token ?? null;
    }

    /**
     * Wrap a Supabase SDK call into our standard ApiResponse shape.
     * This abstraction allows swapping Supabase for another provider later.
     */
    async query<T>(
        operation: string,
        fn: () => Promise<{ data: T | null; error: { message: string; code?: string; details?: string; hint?: string } | null }>
    ): Promise<ApiResponse<T>> {
        logger.debug(`API query: ${operation}`);
        try {
            const { data, error } = await fn();
            if (error) {
                const apiError: ApiError = {
                    message: error.message,
                    code: error.code ?? 'UNKNOWN',
                    details: error.details,
                    hint: error.hint,
                };
                logger.error(`API query failed: ${operation}`, new Error(error.message), {
                    code: apiError.code,
                });
                return { data: null, error: apiError, status: 400 };
            }
            logger.debug(`API query success: ${operation}`);
            return { data, error: null, status: 200 };
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            logger.error(`API query exception: ${operation}`, error);
            return {
                data: null,
                error: { message: error.message, code: 'EXCEPTION' },
                status: 500,
            };
        }
    }

    /**
     * Invoke a Supabase edge function.
     * Abstracted so the frontend never calls edge functions directly.
     */
    async invokeFunction<T>(
        functionName: string,
        body?: Record<string, unknown>
    ): Promise<ApiResponse<T>> {
        logger.info(`Invoking edge function: ${functionName}`, { body });
        try {
            const { data, error } = await supabase.functions.invoke<T>(functionName, {
                body,
            });
            if (error) {
                const apiError: ApiError = {
                    message: error.message,
                    code: 'EDGE_FUNCTION_ERROR',
                };
                logger.error(`Edge function failed: ${functionName}`, new Error(error.message));
                return { data: null, error: apiError, status: 400 };
            }
            logger.debug(`Edge function success: ${functionName}`);
            return { data: data ?? null, error: null, status: 200 };
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            logger.error(`Edge function exception: ${functionName}`, error);
            return {
                data: null,
                error: { message: error.message, code: 'EXCEPTION' },
                status: 500,
            };
        }
    }

    /** Get the raw Supabase client — use sparingly, prefer query() */
    getSupabaseClient() {
        return supabase;
    }
}

/** Get the singleton API client instance */
export function getApiClient(): ApiClient {
    return ApiClient.getInstance();
}

export { ApiClient };
