import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { isSecurePassword } from "@/helpers/functions/validatePassword";
import {
  ClientUpdateData,
  ClienteData,
  ClienteGetResponse,
  DataCliente,
  DataUsuario,
  SearchClienteParams,
} from "@/services/users/Cliente";

class ClienteController {
  private static readonly url = "/api/cliente";
  /**
   * criar
   */
  public async criar(cliente: ClienteData) {
    if (!isSecurePassword(cliente.senha)) {
      throw new Error(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caracter especial"
      );
    }

    const response = await fetch("/api/cliente/cadastro", {
      body: JSON.stringify(cliente),
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
  /**
   * atualizar
   */
  public async atualizar(cliente: ClientUpdateData) {
    const response = await fetch("/api/cliente/atualizar", {
      body: JSON.stringify(cliente),
      method: "PUT",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
  /**
   * obter
   */
  public async obter(
    params: Partial<SearchClienteParams>
  ): Promise<ClienteGetResponse> {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach((entry) => {
      if (entry[1]) searchParams.append(entry[0], entry[1].toString());
    });

    const response = await fetch(
      `${ClienteController.url}?${searchParams.toString()}`
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  /**
   * obterData
   */
  public async obterData(client_id: string): Promise<DataCliente> {
    const response = await fetch(`/api/cliente/dados?cliente_id=${client_id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
  /**
   * obterDadosUsariorio
   */
  public async obterDadosUsuario(): Promise<DataUsuario> {
    const response = await fetch(`${ClienteController.url}/usuario`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }

  /**
   * validarContacto
   */
  public async validarContacto({
    whatsapp,
    codigo,
  }: {
    whatsapp: string;
    codigo: string;
  }) {
    if (isEmptyString(whatsapp) || isEmptyString(codigo)) {
      throw new Error("O whatsapp e o código não podem estar vazios!");
    }

    const response = await fetch("/api/cliente/code/verify/", {
      body: JSON.stringify({ whatsapp, codigo }),
      method: "PUT",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
  public async novoCodigo({
    whatsapp,
  }: {
    whatsapp: string;
  }): Promise<{ message: string }> {
    if (isEmptyString(whatsapp)) {
      throw new Error("O whatsapp não pode estar vazio!");
    }

    const response = await fetch("/api/cliente/code/verify/new", {
      body: JSON.stringify({ whatsapp }),
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
}

export default ClienteController;
