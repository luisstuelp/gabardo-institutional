import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminQuotesList from '@/components/admin/AdminQuotesList';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminQuotesPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminQuotesList />
    </AdminDashboardShell>
  );
}
