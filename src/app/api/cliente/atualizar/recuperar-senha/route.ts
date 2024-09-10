import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { isSecurePassword } from "@/helpers/functions/validatePassword";
import { errorResponse } from "@/helpers/server/errorResponse";
import ClienteService, {
  ClienteRecuperarSenha,
} from "@/services/users/Cliente";
import { NextRequest, NextResponse } from "next/server";

async function recuperarSenha(request: NextRequest) {
  const data: ClienteRecuperarSenha = await request.json();

  if (!isSecurePassword(data.senha)) {
    return NextResponse.json(
      {
        error:
          "A senha deve ter pelo menos 8 caractes, uma letra maiúscula, uma minúscula, um número e um caracter especial",
      },
      { status: 400 }
    );
  }

  if (isEmptyString(data.code)) {
    return NextResponse.json(
      { error: "Código não deve estar vazio" },
      { status: 400 }
    );
  }

  if (isEmptyString(data.whatsapp)) {
    return NextResponse.json({ error: "Contacto inválido" }, { status: 400 });
  }

  try {
    const clienteService = new ClienteService();
    const body = await clienteService.recoverPassword(data);
    const { response } = body;

    return NextResponse.json(response, { status: body.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { recuperarSenha as PUT };
