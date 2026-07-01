import { MessageSquare, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleChat } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export function FloatingChatButton() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { isChatOpen } = useAppSelector((state) => state.ui);

    // Hide on auth pages or if explicit hide
    if (location.pathname.startsWith('/auth')) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                size="icon"
                onClick={() => dispatch(toggleChat())}
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
                    isChatOpen
                        ? "bg-red-500 hover:bg-red-600 rotate-90"
                        : "bg-[#122d54] hover:bg-[#0d1f3d]"
                )}
                title={isChatOpen ? "Fechar Chat" : "Chat IA"}
            >
                {isChatOpen ? (
                    <X className="h-7 w-7 text-white" />
                ) : (
                    <Bot className="h-7 w-7 text-white" />
                )}
            </Button>
        </div>
    );
}

