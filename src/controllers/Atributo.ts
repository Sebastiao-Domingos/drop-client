import { isEmptyString } from "@/helpers/functions/isEmptyString";

export type AtributoData = {
  nome: string;
  id?: string;
};

class AtributoController {
  private static readonly url = "/api/produto/caracteristica/atributo";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: AtributoData) {
    const body = await fetch(AtributoController.url, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (body.error) {
      throw new Error(body.error.error);
    }

    return body.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: AtributoData) {
    if (isEmptyString(data.id) || isEmptyString(data.nome)) {
      throw new Error("O id e o nome não pode estar vazio");
    }

    const body = await fetch(AtributoController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    }).then((res) => res.json());

    return body.response;
  }
  /**
   * apagar
   */
  public async apagar(atributo_id: string) {
    if (atributo_id.trim().length === 0) {
      throw new Error("Atributo id não pode estar vazio");
    }

    const body = await fetch(AtributoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: atributo_id }),
    });
    if (!body.ok) throw new Error("Atributo id não pode estar vazio");
  }
  /**
   * obter
   */
  public async obter(): Promise<AtributoData[]> {
    const body = await fetch(AtributoController.url).then((res) => res.json());

    return body.response;
  }
}

export default AtributoController;
