import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { ProvinciaData } from "@/services/pais/Provincias";

class ProvinciaController {
  private static readonly url = "/api/pais/provincias";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: ProvinciaData) {
    const body = await fetch(ProvinciaController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar província");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: ProvinciaData) {
    if (isEmptyString(data.id) || isEmptyString(data.nome)) {
      throw new Error("O id e o nome não pode estar vazio");
    }

    const body = await fetch(ProvinciaController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar província");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(provincia_id: string) {
    if (isEmptyString(provincia_id)) {
      throw new Error("provincia_id não pode estar vazio");
    }

    const body = await fetch(ProvinciaController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: provincia_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar província");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * obter
   */
  public async obter(pais_id: string = ""): Promise<ProvinciaData[]> {
    const body = await fetch(
      `${ProvinciaController.url}?pais_id=${pais_id}`
    ).then((res) => res.json());

    return body.response;
  }
}

export default ProvinciaController;
