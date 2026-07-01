'use client';

import type { ReactNode } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { AdminRoute } from '@/components/auth/AdminRoute';
import TrucksPageShell from '@/components/providers/TrucksPageShell';

interface TrucksAdminPageShellProps {
  children: ReactNode;
}

export default function TrucksAdminPageShell({ children }: TrucksAdminPageShellProps) {
  return (
    <TrucksPageShell>
      <AdminRoute>
        <AdminLayout>{children}</AdminLayout>
      </AdminRoute>
    </TrucksPageShell>
  );
}
