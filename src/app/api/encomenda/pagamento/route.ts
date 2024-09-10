import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { errorResponse } from "@/helpers/server/errorResponse";
import PagamentoService, { Pagamento } from "@/services/encomenda/pagamento";
import { NextRequest, NextResponse } from "next/server";

async function pagamento(request: NextRequest) {
  return NextResponse.json(
    { error: "Essa rota já não está disponível! Utilize o server action" },
    { status: 400 }
  );

  const encomenda: Pagamento = await request.json();
  const encomenda_id = request.nextUrl.searchParams.get("encomenda_id");

  if (isEmptyString(encomenda_id)) {
    return NextResponse.json(
      { error: "Encomenda não pode ser vazia", status: 400 },
      { status: 400 }
    );
  }

  try {
    const service = new PagamentoService();
    const res = await service.pagamento(encomenda, encomenda_id!);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { pagamento as POST };
