import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminMidiaForm from '@/components/admin/AdminMidiaForm';
import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminMidiaNewArticlePage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminMidiaForm />
    </AdminDashboardShell>
  );
}
