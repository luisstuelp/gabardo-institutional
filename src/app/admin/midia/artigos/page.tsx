import { redirect } from 'next/navigation';
import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminMidiaArticlesContent from '@/components/admin/AdminMidiaArticlesContent';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminMidiaArticlesPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminMidiaArticlesContent />
    </AdminDashboardShell>
  );
}
