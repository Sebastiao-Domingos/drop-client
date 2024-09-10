import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService from "@/services/users/Cliente";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const clienteService = new ClienteService();
    const body = await clienteService.getClientes(params);

    const { response } = body;

    return NextResponse.json(response);
  } catch (error: any) {
    return errorResponse(error);
  }
}

export { GET };
