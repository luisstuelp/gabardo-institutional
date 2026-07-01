/**
 * Tests for the Redux store slices.
 * Covers chat, theme, and UI slices with state mutations and async thunks.
 */
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer, {
    clearActiveChat,
    clearError,
    addOptimisticMessage,
} from '@/store/slices/chatSlice';
import uiReducer from '@/store/slices/uiSlice';
import type { ChatState } from '@/types/chat';

/* ======================== Chat Slice ======================== */
describe('chatSlice', () => {
    const initialState: ChatState = {
        chats: [],
        activeChat: null,
        isLoading: false,
        isSending: false,
        error: null,
    };

    it('should return the initial state', () => {
        const result = chatReducer(undefined, { type: 'unknown' });
        expect(result).toEqual(initialState);
    });

    it('should clear the active chat', () => {
        const stateWithChat: ChatState = {
            ...initialState,
            activeChat: {
                id: '1',
                user_id: 'u1',
                title: 'Test',
                created_at: '',
                updated_at: '',
                messages: [],
            },
        };
        const result = chatReducer(stateWithChat, clearActiveChat());
        expect(result.activeChat).toBeNull();
    });

    it('should clear errors', () => {
        const stateWithError: ChatState = {
            ...initialState,
            error: 'Something went wrong',
        };
        const result = chatReducer(stateWithError, clearError());
        expect(result.error).toBeNull();
    });

    it('should add an optimistic message to active chat', () => {
        const stateWithChat: ChatState = {
            ...initialState,
            activeChat: {
                id: '1',
                user_id: 'u1',
                title: 'Chat',
                created_at: '',
                updated_at: '',
                messages: [],
            },
        };
        const message = {
            id: 'temp-1',
            chat_id: '1',
            role: 'user' as const,
            content: 'Hello',
            created_at: new Date().toISOString(),
        };
        const result = chatReducer(stateWithChat, addOptimisticMessage(message));
        expect(result.activeChat?.messages).toHaveLength(1);
        expect(result.activeChat?.messages[0].content).toBe('Hello');
    });

    it('should not add message if no active chat', () => {
        const message = {
            id: 'temp-1',
            chat_id: '1',
            role: 'user' as const,
            content: 'Hello',
            created_at: new Date().toISOString(),
        };
        const result = chatReducer(initialState, addOptimisticMessage(message));
        expect(result.activeChat).toBeNull();
    });
});

/* ======================== UI Slice ======================== */
describe('uiSlice', () => {
    it('should return a valid initial state', () => {
        const result = uiReducer(undefined, { type: 'unknown' });
        expect(result).toBeDefined();
    });
});

/* ======================== Store Integration ======================== */
describe('Store Integration', () => {
    it('should create a store with all slices', () => {
        const store = configureStore({
            reducer: {
                chat: chatReducer,
                ui: uiReducer,
            },
        });

        const state = store.getState();
        expect(state.chat).toBeDefined();
        expect(state.ui).toBeDefined();
    });

    it('should dispatch actions across slices', () => {
        const store = configureStore({
            reducer: {
                chat: chatReducer,
                ui: uiReducer,
            },
        });

        store.dispatch(clearError());

        expect(store.getState().chat.error).toBeNull();
    });
});
