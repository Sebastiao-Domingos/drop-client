import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { errorResponse } from "@/helpers/server/errorResponse";
import SugestaoItemEncomendaService, {
  DenySugestaoClienteData,
  ValidateSugestaoClienteData,
} from "@/services/encomenda/cliente/sugestao_item_produto_encomenda";
import { NextRequest, NextResponse } from "next/server";

async function getAll(request: NextRequest) {
  try {
    const estado = request.nextUrl.searchParams.get("estado") as
      | "pendente"
      | "negado"
      | "aprovado";
    const service = new SugestaoItemEncomendaService();

    const { response, status } = await service.getAll(estado);

    return NextResponse.json(response, { status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function validate(request: NextRequest) {
  const {
    acao,
    sugestao_id,
    data,
    denyData,
  }: {
    sugestao_id: string;
    acao: "aprova" | "nega";
    data?: ValidateSugestaoClienteData;
    denyData?: DenySugestaoClienteData;
  } = await request.json();

  if (isEmptyString(acao) || (acao !== "aprova" && acao !== "nega")) {
    return NextResponse.json(
      { error: "acao deve ser aprova ou nega" },
      { status: 400 }
    );
  }

  if (isEmptyString(acao)) {
    return NextResponse.json(
      { error: "sugestao_id não deve estar vazia" },
      { status: 400 }
    );
  }

  try {
    const service = new SugestaoItemEncomendaService();

    if (acao === "aprova") {
      const { response, status } = await service.approve(sugestao_id!, data!);
      return NextResponse.json(response, { status });
    }

    const { response, status } = await service.deny(sugestao_id!, denyData!);
    return NextResponse.json(response, { status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { validate as PUT, getAll as GET };
