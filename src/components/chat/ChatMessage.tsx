import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300 group',
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm mt-0.5',
                    isUser
                        ? 'bg-gradient-to-br from-[#122d54] to-[#1e4b8a] text-white ring-2 ring-white'
                        : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-2 ring-white'
                )}
            >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Message Bubble */}
            <div className="flex flex-col gap-1 min-w-0">
                <div
                    className={cn(
                        'px-5 py-3.5 text-sm leading-relaxed shadow-sm relative',
                        isUser
                            ? 'bg-[#122d54] text-white rounded-2xl rounded-tr-sm'
                            : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm'
                    )}
                >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>

                {/* Timestamp */}
                <span
                    className={cn(
                        'text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-1',
                        isUser ? 'text-right' : 'text-left'
                    )}
                >
                    {new Date(message.created_at).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    );
}
