'use client';

import TrucksAdminPageShell from '@/components/providers/TrucksAdminPageShell';
import AdminUsersPage from '@/paginas_trucks/admin/AdminUsersPage';

export default function Page() {
  return (
    <TrucksAdminPageShell>
      <AdminUsersPage />
    </TrucksAdminPageShell>
  );
}
