import { NextResponse } from 'next/server';
import { createServerTrucksSupabaseClient, hashTrucksSessionToken, TRUCKS_USER_COOKIE_NAME } from '@/lib/trucksUserAuth';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TRUCKS_USER_COOKIE_NAME)?.value;

  if (token) {
    const supabase = createServerTrucksSupabaseClient();
    await supabase.from('user_sessions').delete().eq('token_hash', hashTrucksSessionToken(token));
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({ name: TRUCKS_USER_COOKIE_NAME, value: '', httpOnly: true, sameSite: 'lax', maxAge: 0, path: '/' });
  return response;
}
