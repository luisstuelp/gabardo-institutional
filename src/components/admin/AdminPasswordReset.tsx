'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader2, Lock } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';

export type AdminPasswordResetProps = {
  code?: string;
  accessToken?: string;
  refreshToken?: string;
  type?: string;
};

type ResetStatus = 'verifying' | 'ready' | 'updating' | 'success' | 'error';

export function AdminPasswordReset({ code, accessToken, refreshToken, type }: AdminPasswordResetProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ResetStatus>('verifying');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isReady = status === 'ready';
  const isUpdating = status === 'updating';

  useEffect(() => {
    async function prepareSession() {
      try {
        if (type && type !== 'recovery') {
          throw new Error('Este link não é válido para redefinição de senha.');
        }

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
          setStatus('ready');
          return;
        }

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            throw error;
          }
          setStatus('ready');
          return;
        }

        throw new Error('Link inválido ou expirado. Solicite uma nova redefinição.');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Não foi possível validar o link.';
        setErrorMessage(message);
        setStatus('error');
      }
    }

    void prepareSession();
    // We intentionally run this effect only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetDisabled = useMemo(() => {
    if (!password || !confirmPassword) {
      return true;
    }

    if (password !== confirmPassword) {
      return true;
    }

    return password.length < 8;
  }, [password, confirmPassword]);

  const helperText = useMemo(() => {
    if (!password && !confirmPassword) {
      return 'Use ao menos 8 caracteres, combinando letras, números e símbolos.';
    }

    if (password !== confirmPassword) {
      return 'As senhas não conferem.';
    }

    return password.length >= 8 ? 'Senha forte! Continue para finalizar.' : 'A senha deve ter pelo menos 8 caracteres.';
  }, [password, confirmPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (resetDisabled) {
      return;
    }

    setStatus('updating');
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        throw error;
      }

      await supabase.auth.signOut().catch(() => undefined);
      await fetch('/api/admin/logout', { method: 'POST' }).catch(() => undefined);

      setStatus('success');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível atualizar a senha.';
      setErrorMessage(message);
      setStatus('ready');
    }
  };

  const handleBackToLogin = () => {
    router.replace('/admin/login');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gabardo-light-blue/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gabardo-blue/40 blur-[200px] opacity-80" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(56,182,255,0.45)] backdrop-blur-xl"
        >
          {status === 'verifying' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-gabardo-light-blue" />
              <h1 className="text-2xl font-semibold">Validando link de redefinição</h1>
              <p className="text-sm text-white/60">
                Aguarde enquanto confirmamos suas credenciais. Você poderá definir uma nova senha em instantes.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <Lock className="mx-auto h-10 w-10 text-red-400" />
                <h1 className="text-2xl font-semibold text-red-200">Não foi possível continuar</h1>
                <p className="text-sm text-white/60">{errorMessage ?? 'O link de redefinição está inválido ou expirou.'}</p>
              </div>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar ao login
              </button>
            </div>
          )}

          {(isReady || isUpdating) && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2 text-center">
                <Lock className="mx-auto h-10 w-10 text-gabardo-light-blue" />
                <h1 className="text-3xl font-semibold">Defina uma nova senha</h1>
                <p className="text-sm text-white/60">
                  Sua sessão foi validada. Crie uma senha forte para proteger o acesso administrativo.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Nova senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                    placeholder="Mínimo de 8 caracteres"
                    autoComplete="new-password"
                    disabled={isUpdating}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Confirmar senha</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                    placeholder="Repita a nova senha"
                    autoComplete="new-password"
                    disabled={isUpdating}
                  />
                </div>

                <p className="text-xs text-white/50">{helperText}</p>
              </div>

              {errorMessage && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={resetDisabled || isUpdating}
                className="w-full rounded-xl bg-gabardo-light-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-950 transition-all duration-300 hover:bg-gabardo-light-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> Atualizando senha...
                  </span>
                ) : (
                  'Salvar nova senha'
                )}
              </button>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                disabled={isUpdating}
              >
                Voltar ao login
              </button>
            </form>
          )}

          {status === 'success' && (
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
                <h1 className="text-3xl font-semibold text-white">Senha redefinida com sucesso</h1>
                <p className="text-sm text-white/60">
                  Agora você já pode acessar o painel com a nova senha. Recomendamos atualizar seus registros internos.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gabardo-light-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-950 transition-colors hover:bg-gabardo-light-blue/90"
              >
                Voltar ao login
              </button>

              <Link href="/admin/login" className="block text-xs text-white/50 hover:text-white/80">
                Não foi redirecionado? Clique aqui para abrir a página de login.
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
