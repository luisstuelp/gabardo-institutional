import { notFound, redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminPostForm from '@/components/admin/AdminPostForm';
import { readAdminSessionFromCookies } from '@/lib/adminSession';
import { createServerSupabaseClient } from '@/integrations/supabase/server';

interface AdminBlogEditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPostPage({ params }: AdminBlogEditPostPageProps) {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  const resolvedParams = await params;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <AdminDashboardShell email={session.email}>
      <AdminPostForm initialData={data} />
    </AdminDashboardShell>
  );
}
