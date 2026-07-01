'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import FavoritesPage from '@/paginas_trucks/FavoritesPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <FavoritesPage />
    </TrucksPageShell>
  );
}
