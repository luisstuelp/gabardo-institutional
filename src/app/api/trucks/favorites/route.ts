import { NextRequest, NextResponse } from 'next/server';
import { createServerTrucksSupabaseClient, readTrucksUserFromCookies } from '@/lib/trucksUserAuth';
import { readJsonBodyWithLimit } from '@/lib/apiRateLimit';

type FavoritePayload = { vehicleId?: unknown };

export async function GET() {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  const supabase = createServerTrucksSupabaseClient();
  const { data, error } = await supabase
    .from('favorites')
    .select('id, vehicle_id')
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: 'Não foi possível carregar os favoritos.' }, { status: 500 });
  return NextResponse.json({ favorites: data ?? [] }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  let body: FavoritePayload;
  try {
    body = await readJsonBodyWithLimit<FavoritePayload>(request, 2 * 1024);
  } catch {
    return NextResponse.json({ error: 'Veículo inválido.' }, { status: 400 });
  }

  if (typeof body.vehicleId !== 'string') return NextResponse.json({ error: 'Veículo inválido.' }, { status: 400 });

  const supabase = createServerTrucksSupabaseClient();
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: user.id, vehicle_id: body.vehicleId })
    .select('id, vehicle_id')
    .single();

  if (error?.code === '23505') {
    return NextResponse.json({ favorite: { id: '', vehicle_id: body.vehicleId } });
  }
  if (error) return NextResponse.json({ error: 'Não foi possível salvar o favorito.' }, { status: 400 });
  return NextResponse.json({ favorite: data });
}

export async function DELETE(request: NextRequest) {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  const vehicleId = request.nextUrl.searchParams.get('vehicleId');
  if (!vehicleId) return NextResponse.json({ error: 'Veículo inválido.' }, { status: 400 });

  const supabase = createServerTrucksSupabaseClient();
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('vehicle_id', vehicleId);

  if (error) return NextResponse.json({ error: 'Não foi possível remover o favorito.' }, { status: 400 });
  return NextResponse.json({ success: true });
}
