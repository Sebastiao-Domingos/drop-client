import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { PaisData } from "@/services/pais";

class PaisController {
  private static readonly url = "/api/pais";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: PaisData) {
    const body = await fetch(PaisController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar país");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: PaisData) {
    if (isEmptyString(data.id) || isEmptyString(data.nome)) {
      throw new Error("O id e o nome não pode estar vazio");
    }

    const body = await fetch(PaisController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar país");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(atributo_id: string) {
    if (atributo_id.trim().length === 0) {
      throw new Error("pais_id não pode estar vazio");
    }

    const body = await fetch(PaisController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: atributo_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar país");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * obter
   */
  public async obter(): Promise<PaisData[]> {
    const body = await fetch(PaisController.url).then((res) => res.json());

    return body.response;
  }
}

export default PaisController;
