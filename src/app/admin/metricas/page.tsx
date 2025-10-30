import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminMetricsContent from '@/components/admin/AdminMetricsContent';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminMetricsPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email}>
      <AdminMetricsContent />
    </AdminDashboardShell>
  );
}
