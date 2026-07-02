/**
 * Chat API endpoint module.
 * RESTful interface for AI chat operations.
 * Talk to Supabase for persistence and edge functions for OpenAI.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { Chat, ChatMessage, ChatWithMessages } from '@/types/chat';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('ChatAPI');

/** GET /chats — List all chats for a user */
export async function getChats(userId: string): Promise<ApiResponse<Chat[]>> {
    const client = getApiClient();
    logger.info('Fetching chats', { userId });

    return client.query<Chat[]>('getChats', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        return { data: data as Chat[] | null, error };
    });
}

/** GET /chats/:chatId — Get a single chat with all messages */
export async function getChatWithMessages(chatId: string): Promise<ApiResponse<ChatWithMessages>> {
    const client = getApiClient();
    logger.info('Fetching chat with messages', { chatId });

    return client.query<ChatWithMessages>('getChatWithMessages', async () => {
        const supabase = client.getSupabaseClient();

        // Fetch chat
        const { data: chat, error: chatError } = await supabase
            .from('chats')
            .select('*')
            .eq('id', chatId)
            .single();

        if (chatError) return { data: null, error: chatError };

        // Fetch messages
        const { data: messages, error: msgError } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (msgError) return { data: null, error: msgError };

        return {
            data: {
                ...(chat as Chat),
                messages: (messages as ChatMessage[]) || [],
            },
            error: null,
        };
    });
}

/** POST /chats — Create a new chat session */
export async function createChat(
    userId: string,
    title?: string
): Promise<ApiResponse<Chat>> {
    const client = getApiClient();
    logger.info('Creating new chat', { userId, title });

    return client.query<Chat>('createChat', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('chats')
            .insert({ user_id: userId, title: title ?? 'Nova conversa' })
            .select()
            .single();

        return { data: data as Chat | null, error };
    });
}

/** POST /chats/:chatId/messages — Send a message and get AI response */
export async function sendMessage(
    chatId: string,
    content: string
): Promise<ApiResponse<ChatMessage>> {
    const client = getApiClient();
    logger.info('Sending message', { chatId, contentLength: content.length });

    // Save user message to DB
    const userMsgResult = await client.query<ChatMessage>('saveUserMessage', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('chat_messages')
            .insert({ chat_id: chatId, role: 'user', content })
            .select()
            .single();

        return { data: data as ChatMessage | null, error };
    });

    if (userMsgResult.error) return userMsgResult;

    // Try calling OpenAI via edge function first
    const aiResult = await client.invokeFunction<{ message: string }>('ai-chat', {
        chatId,
        userMessage: content,
    });

    // If Edge Function worked, save result and return
    if (!aiResult.error && aiResult.data) {
        // Save AI response to DB
        const aiMsgResult = await client.query<ChatMessage>('saveAiMessage', async () => {
            const supabase = client.getSupabaseClient();
            const { data, error } = await supabase
                .from('chat_messages')
                .insert({
                    chat_id: chatId,
                    role: 'assistant',
                    content: aiResult.data?.message ?? '',
                })
                .select()
                .single();

            return { data: data as ChatMessage | null, error };
        });

        // Update chat's updated_at timestamp
        await client.query('updateChatTimestamp', async () => {
            const supabase = client.getSupabaseClient();
            await supabase
                .from('chats')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', chatId);
            return { data: null, error: null };
        });

        return aiMsgResult;
    }

    // Fallback: call the Next server route so TRUCKS_OPENAI_API_KEY is never exposed in the browser.
    logger.warn('Edge function failed or missing, trying server fallback', { error: aiResult.error });

    try {
        // 1. Fetch conversation history for context
        const supabase = client.getSupabaseClient();
        const { data: history } = await supabase
            .from('chat_messages')
            .select('role, content')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true })
            .limit(10); // Limit context for client-side

        const messages = [
            {
                role: 'system',
                content: `Você é o assistente virtual da Gabardo Trucks, uma concessionária de caminhões.
Seu papel é ajudar os clientes a:
- Encontrar o caminhão ideal para suas necessidades
- Esclarecer dúvidas sobre modelos, especificações e preços
- Fornecer informações sobre financiamento e condições de pagamento
- Orientar sobre manutenção e cuidados com caminhões
- Responder perguntas gerais sobre a Gabardo Trucks

Seja sempre cordial, profissional e objetivo. Responda em português do Brasil.`
            },
            ...(history?.map(msg => ({ role: msg.role, content: msg.content })) || []),
            // User message is already in history because we saved it above?
            // Wait, if we just saved it, it might be in history if we fetch now.
            // Let's check. Yes, 'saveUserMessage' was awaited.
            // But verify if it's included or if we need to append.
            // The query above selects *where chat_id=... order created_at*.
            // Since we just inserted, it should be there.
            // However, to be safe and ensure the latest message is the very last one sent to OpenAI:
        ];

        // Only if the last message in history is NOT the current one (unlikely with await, but possible with race conditions),
        // we might verify. But simpler: relying on history is risky if read-after-write lag exists.
        // Better: Fetch history EXCLUDING the one we just saved? Or just act as if we are continuing.
        // Let's just append the current user message to the history explicitly to ensure it's there,
        // filtering it out from history if valid, OR just relying on the fact we want to send it.
        // Actually best practice: Fetch history, take last N-1, append current.

        // Simplified for fallback:
        const apiMessages = [
            {
                role: 'system',
                content: `Você é o assistente virtual da Gabardo Trucks. Responda em Português.`
            },
            ...(history || []).map(m => ({ role: m.role, content: m.content })),
        ];

        // 2. Call OpenAI through the Next server route.
        const response = await fetch('/api/chat-fallback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: apiMessages,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const aiMessageContent = data.message || "Desculpe, não entendi.";

        // 3. Save AI response to DB
        const aiMsgResult = await client.query<ChatMessage>('saveAiMessage', async () => {
            const { data, error } = await supabase
                .from('chat_messages')
                .insert({
                    chat_id: chatId,
                    role: 'assistant',
                    content: aiMessageContent,
                })
                .select()
                .single();
            return { data: data as ChatMessage | null, error };
        });

        // 4. Update chat timestamp
        await supabase
            .from('chats')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', chatId);

        return aiMsgResult;

    } catch (err) {
        logger.error('Client-side fallback failed', err as Error);
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';

        // Save a fallback error message so chat doesn't look broken
        const fallbackResult = await client.query<ChatMessage>('saveFallbackMessage', async () => {
            const supabase = client.getSupabaseClient();
            const { data, error } = await supabase
                .from('chat_messages')
                .insert({
                    chat_id: chatId,
                    role: 'assistant',
                    content: `Desculpe, estou com dificuldades técnicas. (Detalhe: ${errorMessage})`,
                })
                .select()
                .single();
            return { data: data as ChatMessage | null, error };
        });

        // Return the fallback message so it appears in the chat!
        if (fallbackResult.data) {
            return fallbackResult;
        }

        return {
            data: null,
            error: { message: 'Erro ao processar mensagem', code: 'FALLBACK_ERROR' },
            status: 500
        };
    }
}

/** DELETE /chats/:chatId — Delete a chat and all its messages */
export async function deleteChat(chatId: string): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Deleting chat', { chatId });

    return client.query<null>('deleteChat', async () => {
        const supabase = client.getSupabaseClient();
        const { error } = await supabase.from('chats').delete().eq('id', chatId);
        return { data: null, error };
    });
}
