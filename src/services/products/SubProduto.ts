import { api } from "@/infra/api";
import { SubCategoriaModel } from "./SubCategoria";

export type SubProdutoModel = {
  id?: string;
  nome: string;
  // descricao: string;
  imagem: string;
  sub_categoria: SubCategoriaModel;
  updated_at: string;
};

class SubProduto {
  private readonly BASE_PATH = "/subProduto";

  /**
   * create
   */
  public async create(formData: FormData) {
    const response = await api
      .post<
        {},
        {
          data: SubProdutoModel & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(id: string, formData: FormData) {
    const response = await api
      .put<
        {},
        {
          data: SubProdutoModel & { id: string; created_at: Date };
        }
      >(`${this.BASE_PATH}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll() {
    return this.getBySubCategoria("");
  }

  public async getBySubCategoria(sub_categoria_id: string) {
    const response = await api
      .get<
        {},
        {
          data: (SubProdutoModel & { id: string; created_at: Date })[];
        }
      >(`${this.BASE_PATH}/${sub_categoria_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * delete
   */
  public async delete(id: string) {
    await api.delete<
      {},
      {
        data: undefined;
      }
    >(`${this.BASE_PATH}/${id}`);

    return {
      status: 200,
    };
  }
}

export default SubProduto;
