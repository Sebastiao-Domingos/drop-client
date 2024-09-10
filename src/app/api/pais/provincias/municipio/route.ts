import { logger } from '@/Logger';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import PaisService from '@/services/pais';
import { NextRequest, NextResponse } from 'next/server';

async function obter(request: NextRequest) {
  const provincia_id = request.nextUrl.searchParams.get('provincia_id');
  const paisService = new PaisService();

  if (isEmptyString(provincia_id)) {
    return NextResponse.json({ response: [] }, { status: 200 });
  }

  const res = await paisService.provincias.municipio.getAll(provincia_id!);

  return NextResponse.json(res, { status: res.status });
}

export { obter as GET };
