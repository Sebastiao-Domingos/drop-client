import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService from "@/services/users/Cliente";
import { NextResponse } from "next/server";

async function GET() {
  try {
    const clienteService = new ClienteService();

    const body: any = await clienteService.getDataUsuario();
    // logger.info(body);

    const { response } = body;

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
