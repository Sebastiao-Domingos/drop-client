import { isSecurePassword } from "@/helpers/functions/validatePassword";
import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService, { ClienteData } from "@/services/users/Cliente";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const clienteService = new ClienteService();

  const data: ClienteData = await request.json();

  if (!isSecurePassword(data.senha)) {
    return NextResponse.json(
      {
        error:
          "A senha deve ter pelo menos 8 caractes, uma letra maiúscula, uma minúscula, um número e um caracter especial",
      },
      { status: 400 }
    );
  }

  try {
    const response = await clienteService.create(data);
    const user = response.response;

    return NextResponse.json({ user });
  } catch (error: any) {
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

export { POST };
