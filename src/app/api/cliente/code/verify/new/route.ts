import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService from "@/services/users/Cliente";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const { whatsapp }: { whatsapp: string } = await request.json();

  try {
    const clienteService = new ClienteService();
    const body = await clienteService.requestNewVerificationCode(whatsapp);

    const { response } = body;

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
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

export { POST };
