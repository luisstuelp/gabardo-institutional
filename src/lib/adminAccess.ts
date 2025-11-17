import { createServerSupabaseClient } from '@/integrations/supabase/server';
import { readAdminSessionFromCookies, type AdminSession } from '@/lib/adminSession';

type RequireAdminSessionError = {
  status: number;
  message: string;
  details?: string;
};

type RequireAdminSessionSuccess = {
  session: AdminSession;
  supabase: ReturnType<typeof createServerSupabaseClient>;
};

export type RequireAdminSessionResult = RequireAdminSessionSuccess | { error: RequireAdminSessionError };

export async function requireAdminSession(): Promise<RequireAdminSessionResult> {
  const session = await readAdminSessionFromCookies();

  if (!session) {
    return {
      error: {
        status: 401,
        message: 'Sessão administrativa inválida ou expirada.',
      },
    };
  }

  const supabase = createServerSupabaseClient();

  const { data: adminRole, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.userId)
    .eq('role', 'admin')
    .maybeSingle();

  if (roleError) {
    return {
      error: {
        status: 500,
        message: 'Falha ao verificar permissão administrativa.',
        details: roleError.message,
      },
    };
  }

  if (!adminRole) {
    return {
      error: {
        status: 403,
        message: 'Usuário sem permissão de administrador.',
      },
    };
  }

  return { session, supabase };
}
