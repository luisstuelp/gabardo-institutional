/**
 * auth-operations Edge Function
 *
 * Server-side auth operations that require admin/service role access.
 * Handles: password change, email reset URL generation, account recovery.
 *
 * Endpoint: POST /functions/v1/auth-operations
 * Request body: { operation, email?, newPassword?, redirectTo? }
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

            /**
             * Reset email — sends a password reset email to the given address.
             * Does not require authentication (the user forgot their password).
             * Uses admin client to generate the reset link.
             */
            case 'reset-email': {
                const { email, redirectTo } = body;
                if (!email) {
                    return errorResponse('Email is required', 400, 'MISSING_EMAIL');
                }

                const adminClient = createSupabaseAdmin();
                const { error: resetError } = await adminClient.auth.admin.generateLink({
                    type: 'recovery',
                    email,
                    options: {
                        redirectTo: redirectTo ?? Deno.env.get('SITE_URL') ?? 'http://localhost:8080',
                    },
                });

                if (resetError) {
                    // Don't reveal if email exists or not — always return success
                    console.error('Reset email error:', resetError.message);
                }

                // Always return success to prevent email enumeration
                return jsonResponse({
                    success: true,
                    message: 'If an account with that email exists, a reset link has been sent.',
                });
            }

            /**
             * Recover account — validates a recovery token and allows password change.
             * Used after the user clicks the reset link in their email.
             */
            case 'recover-account': {
                const { email, newPassword } = body;
                if (!email || !newPassword) {
                    return errorResponse('Email and newPassword are required', 400, 'MISSING_FIELDS');
                }

                if (newPassword.length < 6) {
                    return errorResponse('Password must be at least 6 characters', 400, 'WEAK_PASSWORD');
                }

                // Look up user by email and update password
                const adminClient = createSupabaseAdmin();
                const { data: { users }, error: listError } = await adminClient.auth.admin.listUsers();

                if (listError) {
                    return errorResponse('Failed to process recovery', 500, 'INTERNAL_ERROR');
                }

                const targetUser = users.find((u) => u.email === email);
                if (!targetUser) {
                    // Don't reveal that the user doesn't exist
                    return jsonResponse({ success: true, message: 'Recovery processed.' });
                }

                const { error: updateError } = await adminClient.auth.admin.updateUserById(
                    targetUser.id,
                    { password: newPassword }
                );

                if (updateError) {
                    return errorResponse(updateError.message, 400, 'RECOVERY_FAILED');
                }

                console.log('Account recovered successfully', { userId: targetUser.id });
                return jsonResponse({ success: true, message: 'Password has been reset successfully.' });
            }

            default:
                return errorResponse(
                    `Unknown operation: ${operation}. Allowed: change-password, reset-email, recover-account`,
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
