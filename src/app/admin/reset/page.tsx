import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminPasswordReset } from '@/components/admin/AdminPasswordReset';

export const metadata: Metadata = {
  title: 'Redefinir senha administrativa',
  description: 'Atualize sua senha para continuar acessando o painel administrativo da Transportes Gabardo.',
};

type ResetPageSearchParams = {
  token?: string;
  type?: string;
  access_token?: string;
  refresh_token?: string;
};

type ResetPageProps = {
  searchParams: Promise<ResetPageSearchParams> | ResetPageSearchParams;
};

export default async function AdminResetPage({ searchParams }: ResetPageProps) {
  const resolvedSearchParams =
    typeof (searchParams as Promise<ResetPageSearchParams>).then === 'function'
      ? await (searchParams as Promise<ResetPageSearchParams>)
      : (searchParams as ResetPageSearchParams);

  const { token, type, access_token: accessToken, refresh_token: refreshToken } = resolvedSearchParams;

  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">Carregando...</div>}
    >
      <AdminPasswordReset code={token} type={type} accessToken={accessToken} refreshToken={refreshToken} />
    </Suspense>
  );
}
