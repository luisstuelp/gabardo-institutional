'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import CatalogPage from '@/paginas_trucks/CatalogPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <CatalogPage />
    </TrucksPageShell>
  );
}
