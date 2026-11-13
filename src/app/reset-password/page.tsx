'use client';

import TrucksPageShell from '@/components/providers/TrucksPageShell';
import ResetPasswordPage from '@/paginas_trucks/ResetPasswordPage';

export default function Page() {
  return (
    <TrucksPageShell withLayout={false}>
      <ResetPasswordPage />
    </TrucksPageShell>
  );
}
