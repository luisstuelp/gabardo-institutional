import type { AdminRole } from '@/lib/adminSession';
import type { createServerSupabaseClient } from '@/integrations/supabase/server';

export type ServerSupabaseClient = ReturnType<typeof createServerSupabaseClient>;

export type AdminAuditLogRecord = {
  id: string;
  created_at: string;
  actor_id: string | null;
  actor_email: string | null;
  role: AdminRole | null;
  action: string;
  description: string | null;
  route: string | null;
  method: string | null;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
};

type AdminAuditLogInsert = Omit<AdminAuditLogRecord, 'id' | 'created_at'> & {
  created_at?: string | null;
};

type SupabaseAdminAuditClient = {
  from(table: 'admin_audit_logs'): {
    insert(values: AdminAuditLogInsert | AdminAuditLogInsert[]): Promise<{ error: { message?: string } | null }>;
  };
};

export type AdminAuditEntity = {
  type?: string | null;
  id?: string | null;
};

export type LogAdminActionOptions = {
  supabase: ServerSupabaseClient;
  actor?: {
    id?: string | null;
    email?: string | null;
    role?: AdminRole | null;
  };
  action: string;
  description?: string | null;
  route?: string | null;
  method?: string | null;
  entity?: AdminAuditEntity;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export async function logAdminAction({
  supabase,
  actor,
  action,
  description,
  route,
  method,
  entity,
  metadata,
  ipAddress,
  userAgent,
}: LogAdminActionOptions): Promise<void> {
  try {
    const sanitizedMetadata = metadata ? sanitizeMetadata(metadata) : {};
    const payload = {
      actor_id: actor?.id ?? null,
      actor_email: actor?.email ?? null,
      role: actor?.role ?? null,
      action,
      description: description ?? null,
      route: route ?? null,
      method: method ?? null,
      entity_type: entity?.type ?? null,
      entity_id: entity?.id ?? null,
      metadata: sanitizedMetadata,
      ip_address: ipAddress ?? null,
      user_agent: userAgent ?? null,
    };

    const auditClient = supabase as unknown as SupabaseAdminAuditClient;
    const { error } = await auditClient.from('admin_audit_logs').insert(payload);

    if (error) {
      console.error('Falha ao registrar ação administrativa', error);
    }
  } catch (error) {
    console.error('Erro inesperado ao registrar ação administrativa', error);
  }
}

export function extractClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get('x-forwarded-for') ?? headers.get('x-real-ip');

  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();

    if (firstIp) {
      return firstIp;
    }
  }

  return null;
}

function sanitizeMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
  try {
    return JSON.parse(JSON.stringify(metadata, (_key, value) => (typeof value === 'undefined' ? null : value)));
  } catch (error) {
    console.warn('Falha ao serializar metadata de auditoria. Retornando metadata vazia.', error);
    return {};
  }
}
