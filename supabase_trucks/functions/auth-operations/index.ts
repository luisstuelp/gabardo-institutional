/**
 * auth-operations Edge Function
 *
 * Server-side auth operations that require admin/service role access.
 * Handles password changes for the authenticated user.
 *
 * Endpoint: POST /functions/v1/auth-operations
 * Request body: { operation: 'change-password', newPassword }
 *
 * These operations use the Supabase Admin client (service role)
 * because some auth operations (e.g., admin password reset) need elevated privileges.
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsResponse, jsonResponse, errorResponse } from '../_shared/cors.ts';
import { createSupabaseAdmin, createSupabaseUser } from '../_shared/supabase.ts';
import type { AuthOperationRequest } from '../_shared/types.ts';

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return corsResponse();
    }

    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return errorResponse('Missing Authorization header', 401, 'UNAUTHORIZED');
        }

        const body: AuthOperationRequest = await req.json();
        const { operation } = body;

        switch (operation) {
            /**
             * Change password — requires the user to be authenticated.
             * Uses the user-scoped client to validate the JWT,
             * then the admin client to update the password.
             */
            case 'change-password': {
                const { newPassword } = body;
                if (!newPassword || newPassword.length < 6) {
                    return errorResponse('Password must be at least 6 characters', 400, 'WEAK_PASSWORD');
                }

                // Verify the user is authenticated
                const userClient = createSupabaseUser(authHeader);
                const { data: { user }, error: userError } = await userClient.auth.getUser();

                if (userError || !user) {
                    return errorResponse('Invalid or expired session', 401, 'INVALID_SESSION');
                }

                // Use admin client to update the password
                const adminClient = createSupabaseAdmin();
                const { error: updateError } = await adminClient.auth.admin.updateUserById(
                    user.id,
                    { password: newPassword }
                );

                if (updateError) {
                    return errorResponse(updateError.message, 400, 'PASSWORD_UPDATE_FAILED');
                }

                console.log('Password changed successfully', { userId: user.id });
                return jsonResponse({ success: true, message: 'Password changed successfully' });
            }
            default:
                return errorResponse(
                    'Unsupported operation. Use the Supabase password recovery flow for account recovery.',
                    400,
                    'INVALID_OPERATION'
                );
        }
    } catch (error) {
        console.error('auth-operations error:', error);
        const message = error instanceof Error ? error.message : 'Internal server error';
        return errorResponse(message, 500, 'INTERNAL_ERROR');
    }
});
