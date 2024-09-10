import { errorResponse } from "@/helpers/server/errorResponse";
import EncomendaService, { Encomenda } from "@/services/encomenda";
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

  try {
    const service = new EncomendaService();
    const res = await service.encomendaPorCliente(params.toString());

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { POST, GET };
