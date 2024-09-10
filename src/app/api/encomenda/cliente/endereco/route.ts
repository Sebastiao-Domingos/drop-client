import { logger } from "@/Logger";
import { errorResponse } from "@/helpers/server/errorResponse";
import EnderecoService, {
  Endereco, EnderecoDataUpdate,
} from "@/services/encomenda/cliente/Endereco";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const data: Endereco = await request.json();

  try {
    const service = new EnderecoService();
    const res = await service.create(data);

    return NextResponse.json(res.response, { status: res.status });
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
    const service = new EnderecoService();
    const res = await service.delete(id);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
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
  const service = new EnderecoService();
  const res = await service.getAll();

  return NextResponse.json(res, { status: res.status });
}


async function actualizar(request: NextRequest) {
  const data: EnderecoDataUpdate= await request.json();

  try {
    const service = new EnderecoService();

    const res = await service.update(data);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    return errorResponse(error)
  }
}

export { cadastrar as POST, obter as GET, apagar as DELETE , actualizar as PUT };
