/**
 * Shared CORS headers for all Supabase Edge Functions.
 * Enables cross-origin requests from the frontend.
 */
export const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

/**
 * Create a standard JSON response with CORS headers.
 */
export function jsonResponse(
    body: Record<string, unknown>,
    status = 200
): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}

/**
 * Create a CORS preflight response.
 */
export function corsResponse(): Response {
    return new Response('ok', { headers: corsHeaders });
}

/**
 * Create an error response with the right structure.
 */
export function errorResponse(
    message: string,
    status = 400,
    code = 'ERROR'
): Response {
    return jsonResponse({ error: { message, code } }, status);
}
