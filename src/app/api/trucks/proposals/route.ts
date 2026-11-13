import { NextResponse } from 'next/server';
import { createServerTrucksSupabaseClient, readTrucksUserFromCookies } from '@/lib/trucksUserAuth';

export async function GET() {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  const supabase = createServerTrucksSupabaseClient();
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      vehicle:vehicles(
        *,
        images:vehicle_images(*)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Não foi possível carregar as propostas.' }, { status: 500 });
  return NextResponse.json({ proposals: data ?? [] }, { headers: { 'Cache-Control': 'no-store' } });
}
