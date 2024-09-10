import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { isSecurePassword } from "@/helpers/functions/validatePassword";
import { errorResponse } from "@/helpers/server/errorResponse";
import ClientePasswordService, {
  ClientePassword,
} from "@/services/users/password/ClientePassword";
import { NextRequest, NextResponse } from "next/server";

async function actualizarSenha(request: NextRequest) {
  const data: ClientePassword = await request.json();

  if (!isSecurePassword(data.nova_senha)) {
    return NextResponse.json(
      {
        error:
          "A senha deve ter pelo menos 8 caractes, uma letra maiúscula, uma minúscula, um número e um caracter especial",
      },
      { status: 400 }
    );
  }

  if (isEmptyString(data.senha_atual)) {
    return NextResponse.json(
      { error: "Senha actual não pode estar vazia" },
      { status: 400 }
    );
  }

  try {
    const clienteService = new ClientePasswordService();
    const body = await clienteService.execute(data);
    const { response } = body;

    return NextResponse.json(response, { status: body.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { actualizarSenha as PUT };
