import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatWindowProps {
    messages: ChatMessageType[];
    isSending: boolean;
    isLoading: boolean;
    onSendMessage: (content: string) => void;
    onToggleSidebar: () => void;
    chatTitle: string | null;
}

export function ChatWindow({
    messages,
    isSending,
    isLoading,
    onSendMessage,
    onToggleSidebar,
    chatTitle,
}: ChatWindowProps) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, isSending]);

    // Auto-resize logic
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isSending) return;

        onSendMessage(trimmed);
        setInput('');

        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#f8fafc]">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 lg:hidden -ml-2 text-slate-500"
                    onClick={onToggleSidebar}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#122d54] to-[#1e4b8a] flex items-center justify-center shadow-md shadow-blue-900/10">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                            {chatTitle || 'Gabby'}
                            <Sparkles className="h-3 w-3 text-amber-500" />
                        </h3>
                        <p className="text-xs text-slate-500">Sempre online para ajudar</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#122d54] border-t-transparent" />
                        </div>
                    ) : messages.length === 0 ? (
                        /* Welcome State */
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 ring-1 ring-slate-100">
                                <Bot className="h-10 w-10 text-[#122d54]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Olá! Sou a Gabby 🤖</h3>
                            <p className="text-slate-500 max-w-md leading-relaxed mb-8">
                                Sua especialista em caminhões Gabardo. Pergunte sobre modelos,
                                financiamento, ou peça recomendações personalizadas.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                                {[
                                    '🚚 Ver caminhões disponíveis',
                                    '💰 Simular financiamento',
                                    '📋 Como vender meu caminhão?',
                                    '📍 Onde fica a loja?',
                                ].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => onSendMessage(suggestion.substring(2).trim())}
                                        className="text-left text-sm p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
                                    >
                                        <span className="group-hover:text-[#122d54] transition-colors">{suggestion}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))}

                            {isSending && (
                                <div className="flex gap-4 max-w-[85%] mr-auto animate-in fade-in duration-300 items-start">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#122d54] to-[#1e4b8a] flex items-center justify-center shadow-sm mt-0.5">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                                        <div className="flex gap-1.5 grayscale opacity-70">
                                            <div className="w-1.5 h-1.5 bg-[#122d54] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-1.5 h-1.5 bg-[#122d54] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-1.5 h-1.5 bg-[#122d54] rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-4" />
                        </>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="max-w-3xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex items-end gap-2 w-full p-2 bg-slate-50 border border-slate-200 rounded-2xl focus-within:bg-white focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-200 shadow-inner"
                    >
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Digite sua mensagem..."
                            rows={1}
                            className="flex-1 min-h-[44px] max-h-[150px] w-full resize-none border-0 bg-transparent px-3 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-0 focus:outline-none"
                            disabled={isSending}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isSending || !input.trim()}
                            className={cn(
                                "shrink-0 h-10 w-10 rounded-xl transition-all duration-200 shadow-sm mb-0.5",
                                "bg-[#122d54] text-white hover:bg-[#0d1f3d]",
                                (isSending || !input.trim())
                                    ? "opacity-50 cursor-not-allowed shadow-none"
                                    : "opacity-100 hover:scale-105 shadow-md"
                            )}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                    <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                        IA pode cometer erros. Verifique as informações importantes.
                    </p>
                </div>
            </div>
        </div>
    );
}
