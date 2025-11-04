import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminContactsList from '@/components/admin/AdminContactsList';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminContactsPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email}>
      <AdminContactsList />
    </AdminDashboardShell>
  );
}
