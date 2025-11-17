import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminPasswordReset } from '@/components/admin/AdminPasswordReset';

export const metadata: Metadata = {
  title: 'Redefinir senha administrativa',
  description: 'Atualize sua senha para continuar acessando o painel administrativo da Transportes Gabardo.',
};

type ResetPageProps = {
  searchParams: {
    token?: string;
    type?: string;
    access_token?: string;
    refresh_token?: string;
  };
};

export default function AdminResetPage({ searchParams }: ResetPageProps) {
  const { token, type, access_token: accessToken, refresh_token: refreshToken } = searchParams;

  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">Carregando...</div>}
    >
      <AdminPasswordReset code={token} type={type} accessToken={accessToken} refreshToken={refreshToken} />
    </Suspense>
  );
}
