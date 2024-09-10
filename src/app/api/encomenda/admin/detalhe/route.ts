import { errorResponse } from "@/helpers/server/errorResponse";
import EncomendaService from "@/services/encomenda";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  const encomenda_id = request.nextUrl.searchParams.get("encomenda_id");

  try {
    const service = new EncomendaService();
    const res = await service.encomendaDetalheAdministrador(encomenda_id!);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
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

export { GET };
