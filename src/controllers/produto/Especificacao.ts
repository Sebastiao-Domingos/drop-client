import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { EspecificacaoModel } from "@/services/products/Especificacao";

class EspecificacaoController {
  private static readonly url = "/api/produto/especificacao";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: Omit<EspecificacaoModel, "id">) {
    const response = await fetch(EspecificacaoController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  /**
   * apagar
   */
  public async apagar(id: string) {
    if (isEmptyString(id)) {
      throw new Error("Especificação id não pode estar vazia");
    }
    const response = await fetch(EspecificacaoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default EspecificacaoController;
