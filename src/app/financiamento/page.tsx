'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import FinancingPage from '@/paginas_trucks/FinancingPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <FinancingPage />
    </TrucksPageShell>
  );
}
