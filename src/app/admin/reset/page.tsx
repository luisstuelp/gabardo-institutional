import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminPasswordReset } from '@/components/admin/AdminPasswordReset';

export const metadata: Metadata = {
  title: 'Redefinir senha administrativa',
  description: 'Atualize sua senha para continuar acessando o painel administrativo da Transportes Gabardo.',
};

type ResetPageSearchParams = Record<string, string | string[] | undefined>;

type ResetPageProps = {
  searchParams?: ResetPageSearchParams | Promise<ResetPageSearchParams>;
};

export default async function AdminResetPage({ searchParams }: ResetPageProps) {
  let resolvedSearchParams: ResetPageSearchParams = {};

  if (searchParams) {
    const maybePromise = searchParams as Promise<ResetPageSearchParams>;
    if (typeof maybePromise.then === 'function') {
      resolvedSearchParams = (await maybePromise.catch<ResetPageSearchParams>(() => ({}))) ?? {};
    } else {
      resolvedSearchParams = searchParams as ResetPageSearchParams;
    }
  }

  const codeRaw = resolvedSearchParams['code'];
  const tokenRaw = resolvedSearchParams['token'];
  const typeRaw = resolvedSearchParams['type'];
  const accessTokenRaw = resolvedSearchParams['access_token'];
  const refreshTokenRaw = resolvedSearchParams['refresh_token'];

  const code = Array.isArray(codeRaw) ? codeRaw[0] : codeRaw;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : tokenRaw;
  const type = Array.isArray(typeRaw) ? typeRaw[0] : typeRaw;
  const accessToken = Array.isArray(accessTokenRaw) ? accessTokenRaw[0] : accessTokenRaw;
  const refreshToken = Array.isArray(refreshTokenRaw) ? refreshTokenRaw[0] : refreshTokenRaw;

  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">Carregando...</div>}
    >
      <AdminPasswordReset code={code ?? token} type={type} accessToken={accessToken} refreshToken={refreshToken} />
    </Suspense>
  );
}
