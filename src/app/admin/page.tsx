import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { readAdminSessionFromCookies } from '@/lib/adminSession';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';

export const metadata: Metadata = {
  title: 'Painel Administrativo',
  description: 'Gerencie os posts do blog e os artigos da página de mídia.',
};

export default async function AdminDashboardPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email}>
      <div className="space-y-8">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-semibold text-white">Painel da Gabardo</h1>
          <p className="mt-2 text-white/60">
            Bem-vindo, <span className="font-medium text-white/80">{session.email}</span>.
            Gerencie o conteúdo das páginas de Blog e Mídia.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Blog</h2>
            <p className="mt-2 text-sm text-white/60">
              Adicione, edite ou publique novos artigos para o blog corporativo.
            </p>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                <Link href="/admin/blog/posts">Gerenciar posts</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog" target="_blank" rel="noreferrer">
                  Ver página pública
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Mídia</h2>
            <p className="mt-2 text-sm text-white/60">
              Organize destaques, categorias e artigos da página de mídia.
            </p>
            <div className="mt-4 flex gap-3">
              <Button asChild>
                <Link href="/admin/midia/artigos">Gerenciar artigos</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/midia" target="_blank" rel="noreferrer">
                  Ver página pública
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AdminDashboardShell>
  );
}
