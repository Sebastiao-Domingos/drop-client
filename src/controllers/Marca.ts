import { isEmptyString } from "@/helpers/functions/isEmptyString";

export type MarcaData = {
  nome: string;
  imagem: FileList;
  id?: string;
};

class MarcaController {
  private static readonly url = "/api/produto/marca";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: MarcaData) {
    if (data.imagem.length === 0 || isEmptyString(data.nome)) {
      throw new Error("O nome e a imagem não podem estar vazios");
    }

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("imagem", data.imagem.item(0)!);

    const body = await fetch(MarcaController.url, {
      method: "POST",
      body: formData,
    }); //.then((res) => res.json());
    if (!body.ok) {
      throw new Error("Erro ao cadastrar marca!");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: Partial<MarcaData>) {
    if (isEmptyString(data.id)) {
      throw new Error("O id não podem estar vazio");
    }

    const formData = new FormData();

    formData.append("id", data.id!);

    if (!isEmptyString(data.nome)) {
      formData.append("nome", data.nome!);
    }
    if (data.imagem?.length !== 0) {
      formData.append("imagem", data.imagem?.item(0)!);
    }

    const body = await fetch(MarcaController.url, {
      method: "PUT",
      headers: {},
      body: formData,
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar o marca!");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(marca_id: string) {
    if (marca_id.trim().length === 0) {
      throw new Error("marca_id não pode estar vazio");
    }

    const body = await fetch(MarcaController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: marca_id }),
    }); //.then((res) => res.json());
    if (!body.ok) {
      throw new Error("Erro ao apagar marca");
    }

    const json = await body.json();

    return json;
  }
  /**
   * obter
   */
  public async obter(subproduto?: string): Promise<MarcaData[]> {
    const body = await fetch(
      `${MarcaController.url}?subproduto=${subproduto}`
    ).then((res) => res.json());

    return body.response;
  }
}

export default MarcaController;
