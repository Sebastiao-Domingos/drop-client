import { logger } from '@/Logger';
import PaisService, { PaisData } from '@/services/pais';
import { NextResponse } from 'next/server';

async function obter() {
  const service = new PaisService();
  const res = await service.getAll();

  return NextResponse.json(res, { status: res.status });
}

export { obter as GET };
