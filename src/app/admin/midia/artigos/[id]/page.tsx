import { notFound, redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminMidiaForm from '@/components/admin/AdminMidiaForm';
import { readAdminSessionFromCookies } from '@/lib/adminSession';
import { createServerSupabaseClient } from '@/integrations/supabase/server';

interface AdminMidiaEditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMidiaEditArticlePage({ params }: AdminMidiaEditArticlePageProps) {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  const resolvedParams = await params;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('midia')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <AdminDashboardShell email={session.email}>
      <AdminMidiaForm initialData={data} />
    </AdminDashboardShell>
  );
}
