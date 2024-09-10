import { logger } from "@/Logger";
import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService from "@/services/users/Cliente";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  const cliente_id = request.nextUrl.searchParams.get("cliente_id");

  try {
    const service = new ClienteService();

    const res = await service.getDataCliente(cliente_id!);
    const { response } = res;
    return NextResponse.json(response);
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response.data, {
    //       status: error.response.status,
    //     });
    //   }
    // }

    return errorResponse(error);
  }
}

export { GET };
