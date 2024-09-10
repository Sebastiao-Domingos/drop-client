import { logger } from "@/Logger";
import PromocaoService, {
  CreatePromocao,
  UpdatePromocao,
} from "@/services/promocao";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const data: CreatePromocao = await request.json();

  try {
    const service = new PromocaoService();
    const res = await service.create(data);
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

async function actualizar(request: NextRequest) {
  const data: UpdatePromocao = await request.json();

  try {
    const service = new PromocaoService();
    const res = await service.update(data);
    logger.info(res);
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
    const service = new PromocaoService();
    const res = await service.delete(id);
    logger.info(res);
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

export { cadastrar as POST, apagar as DELETE, actualizar as PUT };
