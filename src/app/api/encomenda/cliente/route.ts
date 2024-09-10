import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { errorResponse } from "@/helpers/server/errorResponse";
import EncomendaService, { Encomenda } from "@/services/encomenda";
import EncomendaClienteService from "@/services/encomenda/cliente";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const encomenda: Encomenda = await request.json();

  try {
    const service = new EncomendaService();
    const res = await service.encomenda(encomenda);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (isEmptyString(params.get("encomenda"))) {
    return NextResponse.json(
      { error: "Encomenda inválida!", status: 400 },
      { status: 400 }
    );
  }

  try {
    const service = new EncomendaService();
    const res = await service.encomendaDetalhe(params.get("encomenda")!);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function PUT(request: NextRequest) {
  const { encomenda_id }: { encomenda_id: string } = await request.json();

  if (isEmptyString(encomenda_id)) {
    return NextResponse.json({ error: "Encomenda inválida" }, { status: 400 });
  }

  try {
    const service = new EncomendaClienteService();
    const res = await service.cancelar(encomenda_id);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { GET, POST, PUT };
