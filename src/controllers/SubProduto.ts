import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { SubProdutoModel } from "@/services/products/SubProduto";

export type SubProdutoData = {
  nome: string;
  // descricao: string;
  imagem: FileList;
  sub_categoria_id: string;

  id?: string;
};

class SubProdutoController {
  private static readonly url =
    "/api/produto/categoria/subcategoria/subproduto";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: SubProdutoData) {
    if (data.imagem.length === 0 || isEmptyString(data.nome)) {
      throw new Error("O nome e a imagem não podem estar vazios");
    }

    const formData = new FormData();

    Object.entries(data).forEach((entry) => {
      if (typeof entry[1] === "string") {
        formData.append(entry[0], entry[1]);
      } else {
        formData.append(entry[0], entry[1].item(0)!);
      }
    });

    const body = await fetch(SubProdutoController.url, {
      method: "POST",
      body: formData,
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar subproduto");
    }
    const json = await body.json();
    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: Partial<SubProdutoData>) {
    if (isEmptyString(data.id)) {
      throw new Error("O id não podem estar vazio");
    }

    if (data.imagem?.length === 0 && isEmptyString(data.nome)) {
      throw new Error("O nome e a imagem não podem estar vazios");
    }

    const formData = new FormData();

    formData.append("id", data.id!);

    if (!isEmptyString(data.nome)) {
      formData.append("nome", data.nome!);
    }
    if (data.imagem?.length !== 0) {
      formData.append("imagem", data.imagem?.item(0)!);
    }

    const body = await fetch(SubProdutoController.url, {
      method: "PUT",
      body: formData,
    });

    const json = await body.json();
    if (!body.ok) {
      throw new Error(json.error);
    }
    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(subProduto_id: string) {
    if (subProduto_id.trim().length === 0) {
      throw new Error("SubProduto_id não pode estar vazio");
    }

    const body = await fetch(SubProdutoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: subProduto_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar subproduto");
    }
    const json = await body.json();
    return json.response;
  }
  /**
   * obter
   */
  public async obter(subcategoria_id: string = ""): Promise<SubProdutoModel[]> {
    const body = await fetch(
      `${SubProdutoController.url}?subcategoria_id=${subcategoria_id}`
    ).then((res) => res.json());

    return body.response;
  }
}

export default SubProdutoController;
