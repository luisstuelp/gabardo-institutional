/**
 * database-query Edge Function
 *
 * Generic database operations endpoint.
 * Provides a server-side layer for complex DB queries that need
 * service-role access or cross-table operations beyond simple CRUD.
 *
 * Endpoint: POST /functions/v1/database-query
 * Request body: { table, operation, filters, data, select, orderBy, ascending, limit, offset }
 *
 * IMPORTANT: This function uses the USER'S JWT (RLS applies).
 * For admin operations that bypass RLS, a separate admin function should be used.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsResponse, jsonResponse, errorResponse } from '../_shared/cors.ts';
import { createSupabaseUser } from '../_shared/supabase.ts';
import type { DatabaseQueryRequest } from '../_shared/types.ts';

/** Allowed tables for safety — prevents arbitrary table access */
const ALLOWED_TABLES = [
    'vehicles',
    'vehicle_images',
    'leads',
    'favorites',
    'user_profiles',
    'branches',
    'chats',
    'chat_messages',
];

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return corsResponse();
    }

    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return errorResponse('Missing Authorization header', 401, 'UNAUTHORIZED');
        }

        const body: DatabaseQueryRequest = await req.json();
        const { table, operation, filters, data, select, orderBy, ascending, limit, offset } = body;

        // Validate table name
        if (!table || !ALLOWED_TABLES.includes(table)) {
            return errorResponse(
                `Invalid table. Allowed: ${ALLOWED_TABLES.join(', ')}`,
                400,
                'INVALID_TABLE'
            );
        }

        if (!operation || !['select', 'insert', 'update', 'delete'].includes(operation)) {
            return errorResponse(
                'Invalid operation. Allowed: select, insert, update, delete',
                400,
                'INVALID_OPERATION'
            );
        }

        const supabase = createSupabaseUser(authHeader);

        let result: { data: unknown; error: unknown };

        switch (operation) {
            case 'select': {
                let query = supabase.from(table).select(select ?? '*');

                // Apply filters
                if (filters) {
                    for (const [key, value] of Object.entries(filters)) {
                        query = query.eq(key, value);
                    }
                }

                // Apply ordering
                if (orderBy) {
                    query = query.order(orderBy, { ascending: ascending ?? true });
                }

                // Apply pagination
                if (limit) {
                    const from = offset ?? 0;
                    const to = from + limit - 1;
                    query = query.range(from, to);
                }

                result = await query;
                break;
            }

            case 'insert': {
                if (!data) {
                    return errorResponse('data is required for insert', 400, 'MISSING_DATA');
                }
                result = await supabase.from(table).insert(data).select();
                break;
            }

            case 'update': {
                if (!data || !filters) {
                    return errorResponse('data and filters are required for update', 400, 'MISSING_DATA');
                }
                let query = supabase.from(table).update(data);
                for (const [key, value] of Object.entries(filters)) {
                    query = query.eq(key, value);
                }
                result = await query.select();
                break;
            }

            case 'delete': {
                if (!filters) {
                    return errorResponse('filters are required for delete', 400, 'MISSING_FILTERS');
                }
                let query = supabase.from(table).delete();
                for (const [key, value] of Object.entries(filters)) {
                    query = query.eq(key, value);
                }
                result = await query;
                break;
            }

            default:
                return errorResponse('Unsupported operation', 400, 'UNSUPPORTED');
        }

        if ((result.error as { message?: string })?.message) {
            const err = result.error as { message: string; code?: string };
            return errorResponse(err.message, 400, err.code ?? 'DB_ERROR');
        }

        return jsonResponse({ data: result.data });
    } catch (error) {
        console.error('database-query error:', error);
        const message = error instanceof Error ? error.message : 'Internal server error';
        return errorResponse(message, 500, 'INTERNAL_ERROR');
    }
});
