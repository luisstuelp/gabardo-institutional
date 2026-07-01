import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, MessageSquare, Loader2, LogIn, Plus } from 'lucide-react';
import { Link } from '@/lib/next-router-compat';
import { Button } from '@/components/ui/button_trucks';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    fetchChats,
    loadChat,
    createChat,
    sendMessage,
    addOptimisticMessage,
    clearActiveChat,
    deleteChat
} from '@/store/slices/chatSlice';
import { closeLeadModal, toggleChat } from '@/store/slices/uiSlice'; // Using toggleChat to close
import { ChatWindow } from './ChatWindow';
import { cn } from '@/lib/utils';
import { createLogger } from '@/lib/logger';

const logger = createLogger('ChatWidget');

export function ChatWidget() {
    const dispatch = useAppDispatch();
    const { user, isLoading: authLoading } = useAuth();
    const { isChatOpen } = useAppSelector((state) => state.ui);

    const { chats, activeChat, isLoading, isSending } = useAppSelector(
        (state) => state.chat
    );

    const [view, setView] = useState<'list' | 'chat'>('list');

    // Reset view when closed or reopened
    useEffect(() => {
        if (!isChatOpen) {
            // Optional: reset to list? or keep state? Keeping state is better UX usually.
            // But if activeChat is null, force list.
        } else {
            if (user && chats.length === 0 && !isLoading) {
                dispatch(fetchChats(user.id));
            }
        }
    }, [isChatOpen, user, dispatch]);

    // Update view based on activeChat
    useEffect(() => {
        if (activeChat) {
            setView('chat');
        } else {
            setView('list');
        }
    }, [activeChat]);

    const handleCreateChat = useCallback(async () => {
        if (!user) return;
        await dispatch(createChat({ userId: user.id }));
        setView('chat');
    }, [user, dispatch]);

    const handleSelectChat = useCallback(async (chatId: string) => {
        await dispatch(loadChat(chatId));
        setView('chat');
    }, [dispatch]);

    const handleBackToList = useCallback(() => {
        dispatch(clearActiveChat());
        setView('list');
    }, [dispatch]);

    const handleSendMessage = useCallback(async (content: string) => {
        if (!user) return;

        let chatId = activeChat?.id;

        if (!chatId) {
            const result = await dispatch(createChat({ userId: user.id, title: content.slice(0, 30) }));
            if (createChat.fulfilled.match(result) && result.payload) {
                chatId = result.payload.id;
            }
        }

        if (chatId) {
            // Optimistic
            dispatch(addOptimisticMessage({
                id: `temp-${Date.now()}`,
                chat_id: chatId,
                role: 'user',
                content,
                created_at: new Date().toISOString()
            }));

            dispatch(sendMessage({ chatId, content }));
        }
    }, [user, activeChat, dispatch]);


    if (!isChatOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-[90%] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-40 animate-in slide-in-from-bottom-5 fade-in duration-300">

            {/* Header / Top Bar */}
            <div className="bg-[#122d54] text-white p-4 flex items-center justify-between shadow-md z-10">
                <div className="flex items-center gap-3">
                    {view === 'chat' && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBackToList}
                            className="h-8 w-8 text-white hover:bg-white/10 -ml-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    )}
                    <h3 className="font-bold text-lg">
                        {view === 'chat' ? (activeChat?.title || 'Chat') : 'Suas Conversas'}
                    </h3>
                </div>
                {view === 'list' && user && (
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 text-xs bg-white/10 text-white hover:bg-white/20 border-0"
                        onClick={handleCreateChat}
                    >
                        <Plus className="h-3.5 w-3.5 mr-1.5" />
                        Novo
                    </Button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-slate-50 relative">
                {authLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                ) : !user ? (
                    /* Auth Wall */
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="h-8 w-8 text-[#122d54]" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Faça login para conversar</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            Para salvar seu histórico e oferecer suporte personalizado, precisamos que você entre na sua conta.
                        </p>
                        <Link to="/auth" onClick={() => dispatch(toggleChat())}>
                            <Button className="w-full bg-[#122d54] hover:bg-[#0d1f3d]">
                                <LogIn className="h-4 w-4 mr-2" />
                                Entrar ou Cadastrar
                            </Button>
                        </Link>
                    </div>
                ) : view === 'list' ? (
                    /* Chat List */
                    <div className="h-full overflow-y-auto p-2 space-y-1">
                        {isLoading && chats.length === 0 ? (
                            <div className="flex items-center justify-center h-32">
                                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                            </div>
                        ) : chats.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                                <p className="text-sm text-slate-500">Nenhuma conversa iniciada</p>
                                <Button variant="link" onClick={handleCreateChat}>Começar agora</Button>
                            </div>
                        ) : (
                            chats.map(chat => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleSelectChat(chat.id)}
                                    className="p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer transition-colors group flex items-center gap-3 shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#122d54] font-bold text-xs">
                                        🤖
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <h4 className="font-semibold text-slate-700 text-sm truncate">{chat.title || 'Nova Conversa'}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {new Date(chat.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    /* Chat Window Wrapper */
                    <div className="h-full flex flex-col">
                        <ChatWindow
                            messages={activeChat?.messages || []}
                            isSending={isSending}
                            isLoading={isLoading && !!activeChat}
                            onSendMessage={handleSendMessage}
                            onToggleSidebar={handleBackToList} // Reusing toggle for back on mobile style
                            chatTitle={null} // Hiding title in window since we have widget header
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
