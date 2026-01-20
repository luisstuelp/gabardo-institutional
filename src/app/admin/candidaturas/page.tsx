import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminJobApplicationsList from '@/components/admin/AdminJobApplicationsList';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminCandidaturasPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminJobApplicationsList />
    </AdminDashboardShell>
  );
}
