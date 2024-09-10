import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { CategoriaModel } from "@/services/products/Categoria";
import { SubProdutoModel } from "@/services/products/SubProduto";

export type SubCategoriaData = {
  nome: string;
  categoria_id: string;
  imagem: FileList;
  id?: string;
};

export type SubCategoriaModel = {
  nome: string;
  categoria_id: string;
  imagem: string;
  id?: string;
  categoria: CategoriaModel;
  // sub_produtos: SubProdutoModel[];
};

class SubCategoriaController {
  private static readonly url = "/api/produto/categoria/subcategoria";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: SubCategoriaData) {
    const formData = new FormData();

    Object.entries(data).forEach((entries) => {
      const field = entries[0];

      if (field !== "id") {
        const value = entries[1];
        if (value instanceof FileList) {
          formData.append(field, value.item(0)!);
        } else {
          formData.append(field, value);
        }
      }
    });

    const body = await fetch(SubCategoriaController.url, {
      method: "POST",
      body: formData,
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar subcategoria");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: Partial<SubCategoriaData>) {
    if (isEmptyString(data.id)) {
      throw new Error("O id não pode estar vazio");
    }

    const formData = new FormData();

    Object.entries(data).forEach((entries) => {
      const field = entries[0];

      const value = entries[1];
      if (value instanceof FileList) {
        formData.append(field, value.item(0)!);
      } else {
        formData.append(field, value);
      }
    });

    const body = await fetch(SubCategoriaController.url, {
      method: "PUT",
      headers: {},
      body: formData,
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar subcategoria");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(subCategoria_id: string) {
    if (subCategoria_id.trim().length === 0) {
      throw new Error("subCategoria_id não pode estar vazio");
    }

    const body = await fetch(SubCategoriaController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: subCategoria_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar subcategoria");
    }
    const json = await body.json();

    return json.response;
  }
  /**
   * obter
   */
  public async obter(categoria_id: string = ""): Promise<SubCategoriaModel[]> {
    const body = await fetch(
      SubCategoriaController.url + "?categoria_id=" + categoria_id
    ).then((res) => res.json());

    return body.response;
  }
}

export default SubCategoriaController;
