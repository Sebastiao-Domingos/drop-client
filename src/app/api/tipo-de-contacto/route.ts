import { logger } from "@/Logger";
import TipoContacto, { TypeContacto } from "@/services/TipoContacto";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const { nome }: TypeContacto = await request.json();

  try {
    const service = new TipoContacto();
    const res = await service.create({ nome });
    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(
          { error: error.response?.data.error, status: error.status },
          {
            status: error.response?.status,
          }
        );
      }
    }
    return NextResponse.json(
      { error: "Erro desconhecido", status: 500 },
      { status: 500 }
    );
  }
}

async function actualizar(request: NextRequest) {
  const { nome, id }: TypeContacto = await request.json();

  try {
    const service = new TipoContacto();
    const res = await service.update(id!, { nome });
    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(error.response?.data, {
          status: error.response?.status,
        });
      }
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

async function apagar(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  try {
    const service = new TipoContacto();
    const res = await service.delete(id);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(error.response?.data, {
          status: error.response?.status,
        });
      }
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

async function obter() {
  const service = new TipoContacto();
  const res = await service.getAll();

  return NextResponse.json(res.response, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
