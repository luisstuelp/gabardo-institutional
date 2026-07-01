'use client';

import TrucksAdminPageShell from '@/components/providers/TrucksAdminPageShell';
import AdminContactsPage from '@/paginas_trucks/admin/AdminContactsPage';

export default function Page() {
  return (
    <TrucksAdminPageShell>
      <AdminContactsPage />
    </TrucksAdminPageShell>
  );
}
