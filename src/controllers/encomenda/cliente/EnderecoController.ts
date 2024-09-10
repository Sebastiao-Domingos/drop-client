import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { Endereco, EnderecoData, EnderecoDataUpdate } from "@/services/encomenda/cliente/Endereco";

class EnderecoController {
  private static readonly url = "/api/encomenda/cliente/endereco";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: Endereco): Promise<EnderecoData> {
    const body = await fetch(EnderecoController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await body.json();

    if (!body.ok) {
      throw new Error(json.error);
    }

    return json;
  }

   /**
   * actulizar
   */
   public async atualizar(data: Partial<EnderecoDataUpdate>) {
    if (isEmptyString(data?.id)) {
      throw new Error("O id e o nome não pode estar vazio");
    }

    const body = await fetch(EnderecoController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar endereço");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(endereco_id: string) {
    if (isEmptyString(endereco_id)) {
      throw new Error("Endereço não pode estar vazio");
    }

    const body = await fetch(EnderecoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: endereco_id }),
    });

    const json = await body.json();
    if (!body.ok) {
      throw new Error(json.error || "Erro ao eliminar endereço");
    }

    return json;
  }
  /**
   * obter
   */
  public async obter(): Promise<EnderecoData[]> {
    const body = await fetch(EnderecoController.url).then((res) => res.json());

    return body.response;
  }
}

export default EnderecoController;
