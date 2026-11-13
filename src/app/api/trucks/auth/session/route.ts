import { NextResponse } from 'next/server';
import { readTrucksUserFromCookies } from '@/lib/trucksUserAuth';

export async function GET() {
  try {
    const user = await readTrucksUserFromCookies();
    return NextResponse.json({ user }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Erro ao recuperar sessão de usuário de caminhões', error);
    return NextResponse.json({ user: null }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
