import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService, { ClientUpdateData } from "@/services/users/Cliente";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function PUT(request: NextRequest) {
  const data: ClientUpdateData = await request.json();

  try {
    const clienteService = new ClienteService();
    const body = await clienteService.update(data);
    const { response } = body;

    return NextResponse.json(response, { status: body.status });
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response?.data, {
    //       status: error.response?.status,
    //     });
    //   }
    // }
    return errorResponse(error);
  }
}

export { PUT };
