import { api } from "@/infra/api";
import SubCategoria from "./SubCategoria";

export type CategoriaModel = { id?: string; nome: string; icone: string };

class Categoria {
  private readonly BASE_PATH = "/categoria";
  public readonly subCategoria = new SubCategoria();

  /**
   * create
   */
  public async create({ nome, icone }: CategoriaModel) {
    const response = await api
      .post<
        {},
        {
          data: CategoriaModel & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, { nome, icone })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(id: string, category: Partial<CategoriaModel>) {
    const response = await api
      .put<
        {},
        {
          data: CategoriaModel & {
            id: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${id}`, category)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: {
            id: string;
            nome: string;
            icone: string;
            created_at: Date;
            updated_at: Date;
          }[];
        }
      >(this.BASE_PATH)
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

export default Categoria;
