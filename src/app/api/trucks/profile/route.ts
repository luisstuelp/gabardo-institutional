import { NextResponse } from 'next/server';
import { createServerTrucksSupabaseClient, readTrucksUserFromCookies } from '@/lib/trucksUserAuth';
import { readJsonBodyWithLimit } from '@/lib/apiRateLimit';

type ProfilePayload = {
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  avatar_url?: unknown;
};

export async function GET() {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  const supabase = createServerTrucksSupabaseClient();
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: 'Não foi possível carregar o perfil.' }, { status: 500 });
  return NextResponse.json({ profile: data }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PATCH(request: Request) {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  let body: ProfilePayload;
  try {
    body = await readJsonBodyWithLimit<ProfilePayload>(request, 8 * 1024);
  } catch {
    return NextResponse.json({ error: 'Dados de perfil inválidos.' }, { status: 400 });
  }

  const updates: { full_name?: string; email?: string; phone?: string; avatar_url?: string | null } = {};
  if (typeof body.full_name === 'string') updates.full_name = body.full_name.trim();
  if (typeof body.email === 'string') updates.email = body.email.trim().toLowerCase();
  if (typeof body.phone === 'string') updates.phone = body.phone.trim();
  if (body.avatar_url === null || typeof body.avatar_url === 'string') updates.avatar_url = body.avatar_url;

  if (!Object.keys(updates).length) {
    return NextResponse.json({ error: 'Nenhum campo válido foi informado.' }, { status: 400 });
  }

  const supabase = createServerTrucksSupabaseClient();
  if (updates.email !== undefined || updates.full_name !== undefined) {
    const userUpdates: { email?: string; full_name?: string } = {};
    if (updates.email !== undefined) userUpdates.email = updates.email;
    if (updates.full_name !== undefined) userUpdates.full_name = updates.full_name;
    const { error: userUpdateError } = await supabase.from('users').update(userUpdates).eq('id', user.id);
    if (userUpdateError) {
      const status = userUpdateError.code === '23505' ? 409 : 400;
      return NextResponse.json({ error: userUpdateError.code === '23505' ? 'Este e-mail já está cadastrado.' : 'Não foi possível atualizar o perfil.' }, { status });
    }
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', user.id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: 'Não foi possível atualizar o perfil.' }, { status: 400 });

  return NextResponse.json({ profile: data });
}
