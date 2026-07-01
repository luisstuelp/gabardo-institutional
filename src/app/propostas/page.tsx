'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import ProposalsPage from '@/paginas_trucks/ProposalsPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <ProposalsPage />
    </TrucksPageShell>
  );
}
