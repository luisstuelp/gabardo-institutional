'use client';

import TrucksAdminPageShell from '@/components/providers/TrucksAdminPageShell';
import AdminLeadsPage from '@/paginas_trucks/admin/AdminLeadsPage';

export default function Page() {
  return (
    <TrucksAdminPageShell>
      <AdminLeadsPage />
    </TrucksAdminPageShell>
  );
}
