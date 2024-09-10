import { errorResponse } from "@/helpers/server/errorResponse";
import EncomendaService, { DataProcessingOrders } from "@/services/encomenda";
import { NextRequest, NextResponse } from "next/server";

async function processar(request: NextRequest) {
  const data: DataProcessingOrders = await request.json();
  try {
    const service = new EncomendaService();
    const res = await service.processarEncomendaComFalha(data);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { processar as PUT };
