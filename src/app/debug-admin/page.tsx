'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import DebugAdmin from '@/paginas_trucks/DebugAdmin';

export default function Page() {
  return (
    <TrucksPageShell>
      <DebugAdmin />
    </TrucksPageShell>
  );
}
