import { errorResponse } from "@/helpers/server/errorResponse";
import EncomendaService, { DataProcessingOrders } from "@/services/encomenda";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const service = new EncomendaService();
    const res = await service.encomendaAdmin(params.toString());

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function processar(request: NextRequest) {
  const data: DataProcessingOrders = await request.json();
  try {
    const service = new EncomendaService();
    const res = await service.processarEncomenda(data);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { GET, processar as PUT };
