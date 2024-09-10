import { errorResponse } from "@/helpers/server/errorResponse";
import EncomendaService, { DataProcessingOrders } from "@/services/encomenda";
import { NextRequest, NextResponse } from "next/server";

async function triar(request: NextRequest) {
  const data: DataProcessingOrders = await request.json();
  console.log("api : ", data);
  try {
    const service = new EncomendaService();
    const res = await service.confirmarEncomendaComFalha(data);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { triar as PUT };
