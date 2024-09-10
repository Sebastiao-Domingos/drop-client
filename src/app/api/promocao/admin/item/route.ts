import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ItemPromocaoService from "@/services/promocao/Item";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function adicionar(request: NextRequest) {
  const data: string[] = await request.json();
  const promocao_id = request.nextUrl.searchParams.get("promocao_id");

  if (isEmptyString(promocao_id)) {
    return NextResponse.json(
      { error: "promocao_id não pode estar vazia" },
      { status: 400 }
    );
  }

  try {
    const service = new ItemPromocaoService();
    const res = await service.adicionar(promocao_id!, data);
    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(
          { error: error.response?.data },
          {
            status: error.response?.status,
          }
        );
      }
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

async function remover(request: NextRequest) {
  const item_id = request.nextUrl.searchParams.get("item_id");

  if (isEmptyString(item_id)) {
    return NextResponse.json(
      { error: "item_id não pode estar vazio" },
      { status: 400 }
    );
  }

  try {
    const service = new ItemPromocaoService();
    const res = await service.remover(item_id!);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(
          { error: error.response?.data },
          {
            status: error.response?.status,
          }
        );
      }
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

export { adicionar as PUT, remover as DELETE };
