import { logger } from "@/Logger";
import { errorResponse } from "@/helpers/server/errorResponse";
import EnvioService, {
  EnvioData,
  EnvioResponse,
} from "@/services/encomenda/cliente/envio";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const service = new EnvioService();
async function cadastrar(request: NextRequest) {
  const data: EnvioData = await request.json();

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
  const data: EnvioResponse = await request.json();

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
  const res = await service.getAll();

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
