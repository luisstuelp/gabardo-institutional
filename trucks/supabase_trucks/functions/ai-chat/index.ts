/**
 * ai-chat Edge Function
 *
 * Handles AI chat completions via the OpenAI provider.
 * Receives a chatId and user message, fetches conversation history from the DB,
 * calls the AI provider, saves the response, and returns it.
 *
 * Endpoint: POST /functions/v1/ai-chat
 * Request body: { chatId: string, userMessage: string }
 *
 * Architecture:
 *   Frontend → API Client → Edge Function → OpenAI
 *                                         → Supabase DB (conversation history)
 */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsResponse, jsonResponse, errorResponse } from '../_shared/cors.ts';
import { createSupabaseUser } from '../_shared/supabase.ts';
import { createAIProvider, type ChatCompletionMessage } from '../_shared/openai.ts';
import type { AIChatRequest, ChatMessageRow } from '../_shared/types.ts';

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return corsResponse();
    }

    try {
        // Validate auth header
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return errorResponse('Missing Authorization header', 401, 'UNAUTHORIZED');
        }

        // Parse request body
        const body: AIChatRequest = await req.json();
        const { chatId, userMessage } = body;

        if (!chatId || !userMessage) {
            return errorResponse('chatId and userMessage are required', 400, 'INVALID_INPUT');
        }

        // Create Supabase client with user's JWT (respects RLS)
        const supabase = createSupabaseUser(authHeader);

        // Verify chat belongs to user and exists
        const { data: chat, error: chatError } = await supabase
            .from('chats')
            .select('id, user_id')
            .eq('id', chatId)
            .single();

        if (chatError || !chat) {
            return errorResponse('Chat not found', 404, 'CHAT_NOT_FOUND');
        }

        // Fetch conversation history (last 20 messages for context)
        const { data: history, error: historyError } = await supabase
            .from('chat_messages')
            .select('role, content')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true })
            .limit(20);

        if (historyError) {
            return errorResponse('Failed to fetch chat history', 500, 'DB_ERROR');
        }

        // Build messages for the AI provider
        const messages: ChatCompletionMessage[] = [
            ...(history || []).map((msg: ChatMessageRow) => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
            { role: 'user' as const, content: userMessage },
        ];

        // Create AI provider (dependency injected)
        const aiProvider = createAIProvider();

        // Get AI response
        const aiResponse = await aiProvider.chat(messages);

        console.log('AI response generated', {
            chatId,
            usage: aiResponse.usage,
        });

        // Return the AI response (the frontend API layer handles saving to DB)
        return jsonResponse({
            message: aiResponse.message,
            usage: aiResponse.usage,
        });
    } catch (error) {
        console.error('ai-chat error:', error);
        const message = error instanceof Error ? error.message : 'Internal server error';
        return errorResponse(message, 500, 'INTERNAL_ERROR');
    }
});
