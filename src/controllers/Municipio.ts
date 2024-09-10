import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { MunicipioData } from "@/services/pais/Municipios";

class MunicipioController {
  private static readonly url = "/api/pais/provincias/municipio";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: MunicipioData) {
    const body = await fetch(MunicipioController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar município");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: MunicipioData) {
    if (isEmptyString(data.id) || isEmptyString(data.nome)) {
      throw new Error("O id e o nome não pode estar vazio");
    }

    const body = await fetch(MunicipioController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar município");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(municipio_id: string) {
    if (isEmptyString(municipio_id)) {
      throw new Error("municipio_id não pode estar vazio");
    }

    const body = await fetch(MunicipioController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: municipio_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar município");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * obter
   */
  public async obter(provincia_id: string = ""): Promise<MunicipioData[]> {
    const body = await fetch(
      `${MunicipioController.url}?provincia_id=${provincia_id}`
    ).then((res) => res.json());

    return body.response || [];
  }
}

export default MunicipioController;
