import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Fluxo de cadastro descontinuado. Crie novos usuários administradores através do painel em /admin/usuarios.',
    },
    { status: 410 },
  );
}
