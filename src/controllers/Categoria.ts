import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";

export type CategoriaData = {
  nome: string;
  icone: string;
  id?: string;
};

class CategoriaController {
  private static readonly url = "/api/produto/categoria";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: CategoriaData) {
    const body = await fetch(CategoriaController.url, {
      method: "POST",
      body: JSON.stringify({ nome: data.nome, icone: data.icone }),
    });
    if (!body.ok) {
      throw new Error("Erro ao cadastrar categoria");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: CategoriaData) {
    if (isEmptyString(data.id)) {
      throw new Error("O id não pode estar vazio");
    }

    if (isEmptyString(data.icone) && isEmptyString(data.nome)) {
      throw new Error("Precisa preencher pelo menos um campo para actualizar");
    }

    const filtered: { [key: string]: string } = { id: data.id! };

    Object.entries(data).filter((entry) => {
      if (isEmptyString(entry[1])) {
        filtered[entry[0]] = entry[1].trim();
      }
    });

    const body = await fetch(CategoriaController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar a categoria");
    }
    const json = await body.json();
    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(categoria_id: string) {
    logger.info(categoria_id);
    if (categoria_id.trim().length === 0) {
      return {
        error: true,
        body: { message: "categoria_id não pode estar vazio", status: 0 },
      };
    }

    const body = await fetch(CategoriaController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: categoria_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar categoria");
    }

    const json = await body.json();
    return json.response;
  }
  /**
   * obter
   */
  public async obter(): Promise<CategoriaData[]> {
    const body = await fetch(CategoriaController.url).then((res) => res.json());

    return body.response;
  }
}

export default CategoriaController;
