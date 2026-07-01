/**
 * Tests for chat types and data structures.
 * Validates type contracts used across the chat system.
 */
import { describe, it, expect } from 'vitest';
import type { Chat, ChatMessage, ChatWithMessages, ChatState, SendMessagePayload } from '@/types/chat';

describe('Chat Types', () => {
    it('should create a valid ChatMessage', () => {
        const message: ChatMessage = {
            id: 'msg-1',
            chat_id: 'chat-1',
            role: 'user',
            content: 'Hello AI',
            created_at: '2026-01-01T00:00:00Z',
        };
        expect(message.role).toBe('user');
        expect(message.content).toBe('Hello AI');
    });

    it('should create a valid Chat', () => {
        const chat: Chat = {
            id: 'chat-1',
            user_id: 'user-1',
            title: 'Test Chat',
            created_at: '2026-01-01T00:00:00Z',
            updated_at: '2026-01-01T00:00:00Z',
        };
        expect(chat.title).toBe('Test Chat');
    });

    it('should create ChatWithMessages extending Chat', () => {
        const chatWithMessages: ChatWithMessages = {
            id: 'chat-1',
            user_id: 'user-1',
            title: 'Chat',
            created_at: '',
            updated_at: '',
            messages: [
                { id: 'm1', chat_id: 'chat-1', role: 'user', content: 'Hi', created_at: '' },
                { id: 'm2', chat_id: 'chat-1', role: 'assistant', content: 'Hello!', created_at: '' },
            ],
        };
        expect(chatWithMessages.messages).toHaveLength(2);
        expect(chatWithMessages.messages[0].role).toBe('user');
        expect(chatWithMessages.messages[1].role).toBe('assistant');
    });

    it('should validate ChatState structure', () => {
        const state: ChatState = {
            chats: [],
            activeChat: null,
            isLoading: false,
            isSending: false,
            error: null,
        };
        expect(state.chats).toEqual([]);
        expect(state.isLoading).toBe(false);
    });

    it('should validate SendMessagePayload', () => {
        const payload: SendMessagePayload = {
            chatId: 'chat-1',
            content: 'What trucks do you have?',
        };
        expect(payload.chatId).toBe('chat-1');
    });

    it('should allow null user_id for anonymous chats', () => {
        const chat: Chat = {
            id: 'anon-1',
            user_id: null,
            title: null,
            created_at: '',
            updated_at: '',
        };
        expect(chat.user_id).toBeNull();
        expect(chat.title).toBeNull();
    });
});
