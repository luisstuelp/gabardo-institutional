'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import ProfilePage from '@/paginas_trucks/ProfilePage';

export default function Page() {
  return (
    <TrucksPageShell>
      <ProfilePage />
    </TrucksPageShell>
  );
}
