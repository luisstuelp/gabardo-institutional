'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import VehicleDetailPage from '@/paginas_trucks/VehicleDetailPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <VehicleDetailPage />
    </TrucksPageShell>
  );
}
