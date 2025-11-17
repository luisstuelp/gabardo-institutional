import { NextRequest, NextResponse } from 'next/server';

import { requireAdminSession } from '@/lib/adminAccess';

const MAX_USERS_PER_PAGE = 500;

type AdminUserSummary = {
  id: string;
  email: string | null;
  created_at: string | null;
  last_sign_in_at: string | null;
  confirmed_at: string | null;
  phone: string | null;
  role: 'admin' | 'user';
};

type UpdateRolePayload = {
  action?: 'update-role';
  userId?: string;
  role?: 'admin' | 'user';
};

type CreateUserPayload = {
  action: 'create-user';
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
};

function buildErrorResponse(status: number, message: string, details?: string) {
  return NextResponse.json({ error: message, ...(details ? { details } : {}) }, { status });
}

type SupabaseClientFromContext = ReturnType<typeof requireAdminSession> extends Promise<infer T>
  ? T extends { supabase: infer Client }
    ? Client
    : never
  : never;

type AdminIdsResult = { adminIds: Set<string> } | { error: { message: string } };

async function getAdminIds(supabase: SupabaseClientFromContext): Promise<AdminIdsResult> {
  const { data: rolesData, error: rolesError } = await supabase
    .from('user_roles')
    .select('user_id, role');

  if (rolesError) {
    return { error: { message: rolesError.message ?? 'Erro desconhecido' } };
  }

  const adminIds = new Set<string>();

  for (const entry of rolesData ?? []) {
    if (entry.role === 'admin') {
      adminIds.add(entry.user_id);
    }
  }

  return { adminIds };
}

export async function GET(request: NextRequest) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return buildErrorResponse(adminContext.error.status, adminContext.error.message, adminContext.error.details);
  }

  const {
    supabase,
    session: { userId: currentAdminId },
  } = adminContext;

  const searchParams = new URL(request.url).searchParams;
  const roleFilter = searchParams.get('role');
  const searchTerm = searchParams.get('search')?.trim().toLowerCase() ?? '';

  const [{ data: usersData, error: usersError }, adminResult] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: MAX_USERS_PER_PAGE }),
    getAdminIds(supabase),
  ]);

  if (usersError) {
    return buildErrorResponse(500, 'Não foi possível listar os usuários.', usersError.message);
  }

  if ('error' in adminResult) {
    const { message = 'Erro desconhecido' } = adminResult.error ?? {};
    return buildErrorResponse(500, 'Não foi possível recuperar as permissões dos usuários.', message);
  }

  const roleMap = adminResult.adminIds;

  const shapedUsers: AdminUserSummary[] = (usersData?.users ?? []).map((user) => ({
    id: user.id,
    email: user.email ?? null,
    created_at: user.created_at ?? null,
    last_sign_in_at: user.last_sign_in_at ?? null,
    confirmed_at: user.confirmed_at ?? null,
    phone: user.phone ?? null,
    role: roleMap.has(user.id) ? 'admin' : 'user',
  }));

  let filteredUsers = shapedUsers;

  if (roleFilter === 'admin' || roleFilter === 'user') {
    filteredUsers = filteredUsers.filter((user) => user.role === roleFilter);
  }

  if (searchTerm) {
    filteredUsers = filteredUsers.filter((user) => {
      const haystack = [user.email ?? '', user.phone ?? '', user.id].map((value) => value.toLowerCase());
      return haystack.some((value) => value.includes(searchTerm));
    });
  }

  const adminCount = shapedUsers.filter((user) => user.role === 'admin').length;

  return NextResponse.json({
    users: filteredUsers,
    summary: {
      total: shapedUsers.length,
      admins: adminCount,
      currentAdminId,
      retrievedAt: new Date().toISOString(),
    },
  });
}

export async function POST(request: NextRequest) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return buildErrorResponse(adminContext.error.status, adminContext.error.message, adminContext.error.details);
  }

  const {
    supabase,
    session: { userId: currentAdminId },
  } = adminContext;

  const body = (await request.json().catch(() => null)) as (UpdateRolePayload | CreateUserPayload | null);

  if (!body || typeof body !== 'object') {
    return buildErrorResponse(400, 'Payload inválido.');
  }

  if (body.action === 'create-user') {
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const role = body.role === 'user' ? 'user' : 'admin';

    if (!email) {
      return buildErrorResponse(400, 'Informe um e-mail válido para o novo usuário.');
    }

    if (password.length < 8) {
      return buildErrorResponse(422, 'A senha deve possuir pelo menos 8 caracteres.');
    }

    const { data: createUserData, error: createUserError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createUserError) {
      const status = createUserError.status ?? 500;
      return buildErrorResponse(status === 0 ? 500 : status, createUserError.message ?? 'Não foi possível criar o usuário.');
    }

    const user = createUserData?.user;

    if (!user) {
      return buildErrorResponse(500, 'Usuário não retornado pelo Supabase.');
    }

    if (role === 'admin') {
      const { error: upsertError } = await supabase
        .from('user_roles')
        .upsert({ user_id: user.id, role: 'admin' }, { onConflict: 'user_id' });

      if (upsertError) {
        return buildErrorResponse(500, 'Usuário criado, mas falhou ao atribuir a permissão de administrador.', upsertError.message);
      }
    } else {
      await supabase.from('user_roles').delete().eq('user_id', user.id);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role,
      },
    });
  }

  const payload = body as UpdateRolePayload;

  if (typeof payload.userId !== 'string' || (payload.role !== 'admin' && payload.role !== 'user')) {
    return buildErrorResponse(400, 'Payload inválido. Informe userId e role (admin|user).');
  }

  const targetUserId = payload.userId;
  const targetRole = payload.role;

  if (targetUserId === currentAdminId && targetRole !== 'admin') {
    return buildErrorResponse(400, 'Você não pode remover seu próprio acesso de administrador enquanto estiver conectado.');
  }

  const adminsResult = await getAdminIds(supabase);

  if ('error' in adminsResult) {
    const { message = 'Erro desconhecido' } = adminsResult.error ?? {};
    return buildErrorResponse(500, 'Não foi possível validar as permissões atuais.', message);
  }

  const { adminIds } = adminsResult;

  const isTargetAdmin = adminIds.has(targetUserId);

  if (targetRole === 'user' && isTargetAdmin) {
    if (adminIds.size <= 1) {
      return buildErrorResponse(400, 'Não é possível remover o último administrador do sistema.');
    }

    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', targetUserId);

    if (deleteError) {
      return buildErrorResponse(500, 'Não foi possível remover a permissão de administrador.', deleteError.message);
    }
  }

  if (targetRole === 'admin') {
    const { error: upsertError } = await supabase
      .from('user_roles')
      .upsert({ user_id: targetUserId, role: 'admin' }, { onConflict: 'user_id' });

    if (upsertError) {
      return buildErrorResponse(500, 'Não foi possível conceder a permissão de administrador.', upsertError.message);
    }
  }

  if (targetRole === 'user' && !isTargetAdmin) {
    // No change necessary, but ensure there is no lingering row with different role value
    await supabase.from('user_roles').delete().eq('user_id', targetUserId);
  }

  return NextResponse.json({
    success: true,
    userId: targetUserId,
    role: targetRole,
  });
}

export async function DELETE(request: NextRequest) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return buildErrorResponse(adminContext.error.status, adminContext.error.message, adminContext.error.details);
  }

  const {
    supabase,
    session: { userId: currentAdminId },
  } = adminContext;

  const payload: { userId?: string } | null = await request
    .json()
    .catch(() => null);

  if (!payload || typeof payload.userId !== 'string') {
    return buildErrorResponse(400, 'Payload inválido. Informe o userId do usuário a ser excluído.');
  }

  const targetUserId = payload.userId;

  if (targetUserId === currentAdminId) {
    return buildErrorResponse(400, 'Você não pode excluir o próprio usuário enquanto estiver conectado.');
  }

  const adminsResult = await getAdminIds(supabase);

  if ('error' in adminsResult) {
    return buildErrorResponse(500, 'Não foi possível validar as permissões atuais.', adminsResult.error.message);
  }

  const { adminIds } = adminsResult;
  const isTargetAdmin = adminIds.has(targetUserId);

  if (isTargetAdmin && adminIds.size <= 1) {
    return buildErrorResponse(400, 'Não é possível excluir o último usuário com permissão de administrador.');
  }

  const { error: removeRoleError } = await supabase.from('user_roles').delete().eq('user_id', targetUserId);

  if (removeRoleError) {
    return buildErrorResponse(500, 'Não foi possível remover as permissões do usuário antes da exclusão.', removeRoleError.message);
  }

  const { error: deleteUserError } = await supabase.auth.admin.deleteUser(targetUserId);

  if (deleteUserError) {
    return buildErrorResponse(500, 'Não foi possível excluir o usuário.', deleteUserError.message);
  }

  return NextResponse.json({ success: true, userId: targetUserId });
}
