import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { errorResponse } from '@/helpers/server/errorResponse';
import PontoPickupService, {
  // PontoPickup,
  PontoPickupUpdateData,
} from '@/services/pontoPickup';

import { NextRequest, NextResponse } from 'next/server';

async function atualizar(request: NextRequest) {
  const { id, ...others }: PontoPickupUpdateData & { id: string } =
    await request.json();

  try {
    const service = new PontoPickupService();
    const res = await service.update(id, others);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function apagar(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  try {
    const service = new PontoPickupService();
    const res = await service.delete(id);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function obter(request: NextRequest) {
  const pickup_id: string = request.nextUrl.searchParams.get('id') || '';
  const params = request.nextUrl.searchParams;
  const service = new PontoPickupService();

  if (isEmptyString(pickup_id)) {
    const res = await service.getAll(params.toString());

    return NextResponse.json(res, { status: res.status });
  } else {
    const res = await service.getById(pickup_id);
    return NextResponse.json(res.response, { status: res.status });
  }
}

export { obter as GET, apagar as DELETE, atualizar as PUT };
