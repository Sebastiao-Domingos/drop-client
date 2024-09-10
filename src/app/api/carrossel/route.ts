import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { errorResponse } from '@/helpers/server/errorResponse';
import CarrosselService from '@/services/carrossel';
import { NextRequest, NextResponse } from 'next/server';

const service = new CarrosselService();

async function obter() {
  try {
    let res = await service.getAll();
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { obter as GET };
