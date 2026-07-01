'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import AuthPage from '@/paginas_trucks/AuthPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <AuthPage />
    </TrucksPageShell>
  );
}
