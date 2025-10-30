import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { readAdminSessionFromCookies } from '@/lib/adminSession';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Login Administrativo',
  description: 'Acesse o painel administrativo para gerenciar conteúdo do blog e da área de mídia.',
};

export default async function AdminLoginPage() {
  const session = await readAdminSessionFromCookies();

  if (session) {
    redirect('/admin');
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">Carregando...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
