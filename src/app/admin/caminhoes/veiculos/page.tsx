'use client';

import TrucksAdminPageShell from '@/components/providers/TrucksAdminPageShell';
import AdminVehiclesPage from '@/paginas_trucks/admin/AdminVehiclesPage';

export default function Page() {
  return (
    <TrucksAdminPageShell>
      <AdminVehiclesPage />
    </TrucksAdminPageShell>
  );
}
