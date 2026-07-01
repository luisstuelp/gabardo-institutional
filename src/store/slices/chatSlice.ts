/**
 * Chat Redux slice.
 * Manages AI chat state: chat list, active chat, messages, sending state.
 */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { chatApi } from '@/api';
import { createLogger } from '@/lib/logger';
import type { ChatState, Chat, ChatWithMessages, ChatMessage } from '@/types/chat';

const logger = createLogger('ChatSlice');

const initialState: ChatState = {
    chats: [],
    activeChat: null,
    isLoading: false,
    isSending: false,
    error: null,
};

/** Async thunk: Fetch all chats for a user */
export const fetchChats = createAsyncThunk(
    'chat/fetchChats',
    async (userId: string, { rejectWithValue }) => {
        logger.info('Dispatching fetchChats', { userId });
        const result = await chatApi.getChats(userId);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

/** Async thunk: Load a specific chat with messages */
export const loadChat = createAsyncThunk(
    'chat/loadChat',
    async (chatId: string, { rejectWithValue }) => {
        logger.info('Dispatching loadChat', { chatId });
        const result = await chatApi.getChatWithMessages(chatId);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

/** Async thunk: Create a new chat */
export const createChat = createAsyncThunk(
    'chat/createChat',
    async ({ userId, title }: { userId: string; title?: string }, { rejectWithValue }) => {
        logger.info('Dispatching createChat', { userId, title });
        const result = await chatApi.createChat(userId, title);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

/** Async thunk: Send a message and get AI response */
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ chatId, content }: { chatId: string; content: string }, { rejectWithValue }) => {
        logger.info('Dispatching sendMessage', { chatId });
        const result = await chatApi.sendMessage(chatId, content);
        if (result.error) return rejectWithValue(result.error.message);
        return result.data;
    }
);

/** Async thunk: Delete a chat */
export const deleteChat = createAsyncThunk(
    'chat/deleteChat',
    async (chatId: string, { rejectWithValue }) => {
        logger.info('Dispatching deleteChat', { chatId });
        const result = await chatApi.deleteChat(chatId);
        if (result.error) return rejectWithValue(result.error.message);
        return chatId;
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        clearActiveChat(state) {
            state.activeChat = null;
        },
        clearError(state) {
            state.error = null;
        },
        /** Optimistically add a user message to the active chat */
        addOptimisticMessage(state, action: PayloadAction<ChatMessage>) {
            if (state.activeChat) {
                state.activeChat.messages.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        // fetchChats
        builder
            .addCase(fetchChats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chats = action.payload ?? [];
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // loadChat
        builder
            .addCase(loadChat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activeChat = action.payload ?? null;
            })
            .addCase(loadChat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // createChat
        builder.addCase(createChat.fulfilled, (state, action) => {
            if (action.payload) {
                state.chats.unshift(action.payload);
                state.activeChat = { ...action.payload, messages: [] };
            }
        });

        // sendMessage
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isSending = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isSending = false;
                if (action.payload && state.activeChat) {
                    state.activeChat.messages.push(action.payload);
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload as string;
            });

        // deleteChat
        builder.addCase(deleteChat.fulfilled, (state, action) => {
            state.chats = state.chats.filter((c) => c.id !== action.payload);
            if (state.activeChat?.id === action.payload) {
                state.activeChat = null;
            }
        });
    },
});

export const { clearActiveChat, clearError, addOptimisticMessage } = chatSlice.actions;
export default chatSlice.reducer;
