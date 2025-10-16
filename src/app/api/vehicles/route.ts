import { NextRequest, NextResponse } from 'next/server';

import { vehicleCatalog } from '@/data/vehicleCatalog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');

  if (!category) {
    const categories = Object.keys(vehicleCatalog).sort((a, b) => a.localeCompare(b));
    return NextResponse.json({ items: categories });
  }

  const categoryData = vehicleCatalog[category];
  if (!categoryData) {
    return NextResponse.json({ error: 'Categoria não encontrada.' }, { status: 404 });
  }

  if (!brand) {
    const brands = Object.keys(categoryData).sort((a, b) => a.localeCompare(b));
    return NextResponse.json({ items: brands });
  }

  const models = categoryData[brand];
  if (!models) {
    return NextResponse.json({ error: 'Marca não encontrada para a categoria selecionada.' }, { status: 404 });
  }

  return NextResponse.json({ items: models });
}
