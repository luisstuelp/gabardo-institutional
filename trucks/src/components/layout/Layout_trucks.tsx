import { ReactNode } from 'react';
import { Header } from './Header_trucks';
import { Footer } from './Footer_trucks';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { ChatWidget } from '@/components/chat/ChatWidget';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingChatButton />
      <ChatWidget />
    </div>
  );
}
