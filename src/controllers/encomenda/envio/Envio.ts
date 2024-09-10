import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { EnvioData, EnvioResponse } from "@/services/encomenda/cliente/envio";

class EnvioController {
  private static readonly url = "/api/encomenda/cliente/envio";

  /**
   * criar
   */
  public async criar(data: EnvioData) {
    const body = await fetch(EnvioController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar modo de envio");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: EnvioResponse) {
    const { id, nome, preco_envio, tempo_envio, disponibilidade } = data;
    if (isEmptyString(id)) {
      throw new Error("O id não pode estar vazio");
    }

    const body = await fetch(EnvioController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify({
        id: id,
        nome: nome,
        tempo_envio: tempo_envio,
        preco_envio: preco_envio,
        disponibilidade: disponibilidade,
      }),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar o modo envio");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(envio_id: string) {
    if (envio_id.trim().length === 0) {
      throw new Error("id do envio não pode estar vazio");
    }

    const body = await fetch(EnvioController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: envio_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar o modo de envio");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * obter
   */
  public async obter(): Promise<EnvioResponse[]> {
    const body = await fetch(EnvioController.url).then((res) => res.json());

    return body.response;
  }
}

export default EnvioController;
