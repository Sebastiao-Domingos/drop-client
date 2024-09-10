import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import PromocaoService from "@/services/promocao";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function obter(request: NextRequest) {
  const tipo = request.nextUrl.searchParams.get("tipo");
  const id = request.nextUrl.searchParams.get("promocao");

  try {
    const service = new PromocaoService();
    logger.info(tipo);

    if (isEmptyString(tipo) || tipo === "all") {
      const res = await service.getAll();
      return NextResponse.json(res.response, { status: res.status });
    } else if (tipo === "detalhe") {
      if (isEmptyString(id)) {
        return NextResponse.json(
          { error: "Promoção inválida" },
          { status: 400 }
        );
      }

      const res = await service.get(id!);
      return NextResponse.json(res.response, { status: res.status });
    } else if (tipo === "valida") {
      const res = await service.getAllValida();
      return NextResponse.json(res.response, { status: res.status });
    } else {
      return NextResponse.json({ error: "tipo inválido" }, { status: 400 });
    }
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

export { obter as GET };
