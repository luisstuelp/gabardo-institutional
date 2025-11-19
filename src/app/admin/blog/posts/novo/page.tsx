import { redirect } from 'next/navigation';

import AdminDashboardShell from '@/components/admin/AdminDashboardShell';
import AdminPostForm from '@/components/admin/AdminPostForm';

import { readAdminSessionFromCookies } from '@/lib/adminSession';

export default async function AdminBlogNewPostPage() {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminDashboardShell email={session.email} role={session.role}>
      <AdminPostForm />
    </AdminDashboardShell>
  );
}
