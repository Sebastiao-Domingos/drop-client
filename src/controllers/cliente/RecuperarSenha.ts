import { isSecurePassword } from "@/helpers/functions/validatePassword";
import {
  ClienteRecuperarSenha,
  ClienteSession,
} from "@/services/users/Cliente";

class RecuperarSenhaClienteController {
  /**
   * recuperar
   */
  public async recuperar(data: ClienteRecuperarSenha): Promise<ClienteSession> {
    if (!isSecurePassword(data.senha)) {
      throw new Error(
        "A senha deve ter pelo menos 8 caractes, uma letra maiúscula, uma minúscula, um número e um caracter especial"
      );
    }

    const response = await fetch("/api/cliente/atualizar/recuperar-senha", {
      body: JSON.stringify(data),
      method: "PUT",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default RecuperarSenhaClienteController;
