'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import RegisterPage from '@/paginas_trucks/RegisterPage';

export default function Page() {
  return (
    <TrucksPageShell>
      <RegisterPage />
    </TrucksPageShell>
  );
}
