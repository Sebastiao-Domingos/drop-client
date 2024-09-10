import { logger } from '@/Logger';
import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { errorResponse } from '@/helpers/server/errorResponse';
import PaisService from '@/services/pais';
import { NextRequest, NextResponse } from 'next/server';

async function obter(request: NextRequest) {
  const pais_id = request.nextUrl.searchParams.get('pais_id');
  const paisService = new PaisService();

  try {
    if (isEmptyString(pais_id)) {
      const res = await paisService.provincias.getAll();
      return NextResponse.json(res, { status: res.status });
    } else {
      const res = await paisService.provincias.getByPaisId(pais_id!);
      return NextResponse.json(res, { status: res.status });
    }
  } catch (error) {
    return errorResponse(error);
  }
}

export { obter as GET };
