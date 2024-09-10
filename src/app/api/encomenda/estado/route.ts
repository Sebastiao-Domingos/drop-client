import { logger } from '@/Logger';
import { errorResponse } from '@/helpers/server/errorResponse';
import EstadoEncomendaService, {
  EstadoEncomendaData,
  EstadoEncomendaResponse,
} from '@/services/encomenda/admin/estado_encomenda';
import { NextRequest, NextResponse } from 'next/server';

const service = new EstadoEncomendaService();

async function cadastrar(request: NextRequest) {
  const data: EstadoEncomendaData = await request.json();

  try {
    const res = await service.create(data);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    // if (error instanceof AxiosError) {
    //   if (error.response?.status) {
    //     return NextResponse.json(
    //       { error: error.response?.data, status: error.status },
    //       {
    //         status: error.response?.status,
    //       }
    //     );
    //   }
    // }
    return errorResponse(error);
  }
}

async function actualizar(request: NextRequest) {
  const data: EstadoEncomendaResponse = await request.json();

  try {
    const res = await service.update(data);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    // if (error instanceof AxiosError) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response?.data, {
    //       status: error.response?.status,
    //     });
    //   }
    // }
    return errorResponse(error);
  }
}

async function apagar(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  try {
    const res = await service.delete(id);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    // if (error instanceof AxiosError) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response?.data, {
    //       status: error.response?.status,
    //     });
    //   }
    // }
    return errorResponse(error);
  }
}

async function obter() {
  const res = await service.get();

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
