/**
 * Shared types for all Supabase Edge Functions.
 */

/** Standard response shape for edge functions */
export interface EdgeFunctionResponse<T = unknown> {
    data?: T;
    error?: {
        message: string;
        code?: string;
    };
}

/** Chat message as stored in the database */
export interface ChatMessageRow {
    id: string;
    chat_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created_at: string;
}

/** Chat session as stored in the database */
export interface ChatRow {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

/** Request body for the ai-chat edge function */
export interface AIChatRequest {
    chatId: string;
    userMessage: string;
}

/** Request body for the database-query edge function */
export interface DatabaseQueryRequest {
    table: string;
    operation: 'select' | 'insert' | 'update' | 'delete';
    filters?: Record<string, unknown>;
    data?: Record<string, unknown>;
    select?: string;
    orderBy?: string;
    ascending?: boolean;
    limit?: number;
    offset?: number;
}

/** Request body for the auth-operations edge function */
export interface AuthOperationRequest {
    operation: 'change-password' | 'reset-email' | 'recover-account';
    email?: string;
    newPassword?: string;
    redirectTo?: string;
}
