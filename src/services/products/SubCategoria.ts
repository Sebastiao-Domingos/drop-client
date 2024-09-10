import { api } from "@/infra/api";
import SubProduto from "./SubProduto";
import { CategoriaModel } from "./Categoria";

export type SubCategoriaModel = {
  id?: string;
  nome: string;
  categoria: CategoriaModel;
  imagem: string;
  updated_at: string;
};

class SubCategoria {
  private readonly BASE_PATH = "/subCategoria";
  public readonly subProduto = new SubProduto();

  /**
   * create
   */
  public async create(formData: FormData) {
    const response = await api
      .post<
        {},
        {
          data: SubCategoriaModel & {
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
          data: SubCategoriaModel;
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

  public async getByCategoria(categoria_id: string) {
    const response = await api
      .get<
        {},
        {
          data: SubCategoriaModel[];
        }
      >(`${this.BASE_PATH}/${categoria_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll() {
    return this.getByCategoria("");
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

export default SubCategoria;
