import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminLogsContent from '@/components/admin/AdminLogsContent';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminLogsPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  if (session.role !== 'admin') {
    redirect('/admin');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminLogsContent />
    </AdminDashboardShell>
  );
}
