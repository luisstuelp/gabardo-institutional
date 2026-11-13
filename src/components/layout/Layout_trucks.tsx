import { ReactNode } from 'react';
import { Header } from './Header_trucks';
import { Footer } from './Footer_trucks';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Chat IA pausado. Os componentes e os fluxos de conversa continuam em components/chat. */}
      {/*
      <FloatingChatButton />
      <ChatWidget />
      */}
    </div>
  );
}
