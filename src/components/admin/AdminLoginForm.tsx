'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Loader2, Mail, X } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40 transition-all duration-200';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  const closeResetModal = () => {
    setIsResetModalOpen(false);
    setResetEmail('');
    setResetError(null);
    setResetSuccess(false);
    setIsRequestingReset(false);
  };

  const handlePasswordResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resetEmail.trim()) {
      setResetError('Informe um e-mail válido.');
      return;
    }

    setIsRequestingReset(true);
    setResetError(null);
    setResetSuccess(false);

    try {
      const response = await fetch('/api/admin/password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail.trim() }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Não foi possível enviar o e-mail de redefinição.');
      }

      setResetSuccess(true);
    } catch (requestError) {
      const defaultMessage = 'Não foi possível enviar o e-mail de redefinição.';
      setResetError(requestError instanceof Error ? requestError.message : defaultMessage);
    } finally {
      setIsRequestingReset(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
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
      const defaultMessage = 'Erro inesperado ao fazer login.';
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
            <h1 className="text-3xl font-semibold">Acesso Administrativo</h1>
            <p className="mt-2 text-sm text-white/60">
              Faça login para gerenciar o conteúdo da Gabardo. Novos acessos devem ser criados pela equipe responsável
              no painel de administração.
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
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </motion.button>

            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="w-full text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
            >
              Esqueci minha senha
            </button>
          </form>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center text-xs text-white/40"
          >
            Área restrita aos administradores da Transportes Gabardo Ltda.
          </motion.p>
        </motion.div>
      </div>

      {isResetModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-neutral-950/80 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-2xl border border-white/15 bg-neutral-950/95 p-6 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={closeResetModal}
              className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 space-y-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gabardo-blue/20 text-gabardo-light-blue">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">Redefinir senha</h2>
              <p className="text-sm text-white/60">
                Informe o e-mail cadastrado para receber o link de redefinição. Ele expira em alguns minutos.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handlePasswordResetRequest}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">E-mail cadastrado</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(event) => setResetEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                  placeholder="admin@transgabardo.com.br"
                  required
                  disabled={isRequestingReset || resetSuccess}
                />
              </div>

              {resetError && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  {resetError}
                </motion.div>
              )}

              {resetSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                >
                  Enviamos um e-mail com instruções para redefinir a senha. Verifique sua caixa de entrada e spam.
                </motion.div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={closeResetModal}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:border-white/30 hover:bg-white/10 sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isRequestingReset || resetSuccess}
                  className="w-full rounded-xl bg-gabardo-light-blue px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-950 transition-colors hover:bg-gabardo-light-blue/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isRequestingReset ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    'Enviar link'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
