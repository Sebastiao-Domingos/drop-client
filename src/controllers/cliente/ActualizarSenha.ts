import { isSecurePassword } from "@/helpers/functions/validatePassword";
import { ClientePassword } from "@/services/users/password/ClientePassword";

class ClienteSenhaController {
  /**
   * recuperar
   */
  public async actualizar(data: ClientePassword): Promise<{ message: string }> {
    if (!isSecurePassword(data.nova_senha)) {
      throw new Error(
        "A senha deve ter pelo menos 8 caractes, uma letra maiúscula, uma minúscula, um número e um caracter especial"
      );
    }

    const response = await fetch("/api/cliente/atualizar/password", {
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

export default ClienteSenhaController;
