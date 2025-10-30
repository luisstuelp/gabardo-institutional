import { redirect } from 'next/navigation';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminBlogPostsContent from '@/components/admin/AdminBlogPostsContent';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminBlogPostsPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email}>
      <AdminBlogPostsContent />
    </AdminDashboardShell>
  );
}
