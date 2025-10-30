'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const navLinks = [
  { href: '/admin', label: 'Início' },
  { href: '/admin/blog/posts', label: 'Blog' },
  { href: '/admin/midia/artigos', label: 'Mídia' },
];

interface AdminDashboardShellProps {
  children: ReactNode;
  email: string;
}

export default function AdminDashboardShell({ children, email }: AdminDashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const activeLink = useMemo(() => {
    if (!pathname) {
      return '';
    }

    return navLinks.find((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))?.href ?? '';
  }, [pathname]);

  const handleLogout = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      const response = await fetch('/api/admin/logout', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Não foi possível encerrar a sessão.');
      }

      router.replace('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Erro ao encerrar sessão administrativa', error);
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gabardo-light-blue/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gabardo-blue/40 blur-[200px] opacity-80" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-neutral-900/70 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-lg font-semibold tracking-[0.3em] uppercase text-white/70">
                Gabardo Admin
              </Link>
              <nav className="hidden items-center gap-2 md:flex">
                {navLinks.map((link) => {
                  const isActive = activeLink === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-white/15 text-white shadow-[0_12px_30px_-20px_rgba(56,182,255,0.65)]'
                          : 'text-white/60 hover:text-white hover:bg-white/10',
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-white/60 sm:inline-flex">
                {email}
              </span>
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                disabled={isSigningOut}
                className="border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/15"
              >
                <LogOut className="h-4 w-4" />
                {isSigningOut ? 'Saindo...' : 'Sair'}
              </Button>
            </div>
          </div>

          <nav className="flex items-center gap-2 border-t border-white/10 px-6 py-3 md:hidden">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex-1 rounded-full px-3 py-2 text-center text-xs font-medium uppercase tracking-[0.25em] transition-all duration-200',
                    isActive ? 'bg-white/15 text-white' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
