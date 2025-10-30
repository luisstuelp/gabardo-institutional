'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40 transition-all duration-200';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const endpoint = mode === 'register' ? '/api/admin/register' : '/api/admin/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Falha no login.');
      }

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        session?: { access_token: string; refresh_token: string };
      };

      if (data.session?.access_token && data.session?.refresh_token) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        if (sessionError) {
          throw sessionError;
        }
      }

      router.replace('/admin');
      router.refresh();
    } catch (submitError) {
      const defaultMessage = mode === 'register'
        ? 'Erro inesperado ao realizar cadastro.'
        : 'Erro inesperado ao fazer login.';
      setError(submitError instanceof Error ? submitError.message : defaultMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-24 h-[480px] w-[480px] rounded-full bg-gabardo-blue/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gabardo-light-blue/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(56,182,255,0.45)] backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gabardo-blue/20 text-gabardo-light-blue">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-semibold">
              {mode === 'register' ? 'Cadastro de Administrador' : 'Acesso Administrativo'}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {mode === 'register'
                ? 'Crie uma conta administrativa para gerenciar o conteúdo do blog e da mídia.'
                : 'Faça login para gerenciar o conteúdo do blog e da mídia.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClasses}
                placeholder="admin@transgabardo.com.br"
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClasses}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gabardo-light-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-950 transition-all duration-300 hover:bg-gabardo-light-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {mode === 'register' ? 'Cadastrando...' : 'Entrando...'}
                </span>
              ) : (
                mode === 'register' ? 'Cadastrar e entrar' : 'Entrar'
              )}
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center text-xs text-white/40"
          >
            Área restrita aos administradores da Gabardo Transportes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 text-center text-sm text-white/60"
          >
            <span className="mr-2">
              {mode === 'register' ? 'Já possui um acesso aprovado?' : 'Ainda não possui um acesso aprovado?'}
            </span>
            <button
              type="button"
              onClick={() => setMode((current) => (current === 'register' ? 'login' : 'register'))}
              className="font-semibold text-gabardo-light-blue transition-colors hover:text-white"
            >
              {mode === 'register' ? 'Fazer login' : 'Solicitar cadastro'}
            </button>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-xs text-white/40"
        >
          Área restrita aos administradores da Gabardo Transportes.
        </motion.p>
      </div>
    </div>
  );
}
