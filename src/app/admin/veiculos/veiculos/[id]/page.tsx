'use client';

import TrucksAdminPageShell from '@/components/providers/TrucksAdminPageShell';
import AdminVehicleFormPage from '@/paginas_trucks/admin/AdminVehicleFormPage';

export default function Page() {
  return (
    <TrucksAdminPageShell>
      <AdminVehicleFormPage />
    </TrucksAdminPageShell>
  );
}
