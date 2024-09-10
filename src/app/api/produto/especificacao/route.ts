import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { errorResponse } from "@/helpers/server/errorResponse";
import Especificacao, {
  EspecificacaoModel,
} from "@/services/products/Especificacao";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const especificacao: Omit<EspecificacaoModel, "id"> = await request.json();

  try {
    const service = new Especificacao();
    const res = await service.create(especificacao);
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

  if (isEmptyString(id)) {
    return NextResponse.json({
      status: 400,
      error: "O ID não pode estar vazio",
    });
  }

  try {
    const service = new Especificacao();
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

export { cadastrar as POST, apagar as DELETE };
