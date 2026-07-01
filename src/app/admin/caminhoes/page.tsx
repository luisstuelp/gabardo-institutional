'use client';

import TrucksAdminPageShell from '@/components/providers/TrucksAdminPageShell';
import AdminDashboardPage from '@/paginas_trucks/admin/AdminDashboardPage';

export default function Page() {
  return (
    <TrucksAdminPageShell>
      <AdminDashboardPage />
    </TrucksAdminPageShell>
  );
}
