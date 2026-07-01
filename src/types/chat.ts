/**
 * Chat and AI-related types for the Gabardo Trucks application.
 * Used by the OpenAI chatbox feature.
 */

/** A single chat message */
export interface ChatMessage {
    id: string;
    chat_id: string;
    role: ChatMessageRole;
    content: string;
    created_at: string;
}

/** Allowed roles for chat messages */
export type ChatMessageRole = 'user' | 'assistant' | 'system';

/** A chat session with optional messages */
export interface Chat {
    id: string;
    user_id: string | null;
    title: string | null;
    created_at: string;
    updated_at: string;
}

/** Chat with its messages loaded */
export interface ChatWithMessages extends Chat {
    messages: ChatMessage[];
}

/** Payload to send a new message to the AI */
export interface SendMessagePayload {
    chatId: string;
    content: string;
}

/** Payload to create a new chat session */
export interface CreateChatPayload {
    title?: string;
}

/** Redux chat state slice */
export interface ChatState {
    chats: Chat[];
    activeChat: ChatWithMessages | null;
    isLoading: boolean;
    isSending: boolean;
    error: string | null;
}

/** Configuration for the AI provider (abstracted) */
export interface AIProviderConfig {
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
    systemPrompt: string;
}
