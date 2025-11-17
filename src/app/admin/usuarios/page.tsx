import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import { readAdminSessionFromCookies } from '@/lib/adminSession';
import AdminUsersContent from '@/components/admin/AdminUsersContent';

export default async function AdminUsersPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  if (session.role !== 'admin') {
    redirect('/admin');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminUsersContent />
    </AdminDashboardShell>
  );
}
