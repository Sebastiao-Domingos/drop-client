import { api } from "@/infra/api";

export type AtributoModel = { nome: string };

class Atributo {
  private readonly BASE_PATH = "/atributo";

  /**
   * create
   */
  public async create({ nome }: AtributoModel) {
    const response = await api
      .post<
        {},
        {
          data: AtributoModel & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, { nome })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(id: string, atributo: AtributoModel) {
    const response = await api
      .put<
        {},
        {
          data: AtributoModel & {
            id: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${id}`, atributo)
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
          data: AtributoModel &
            {
              id: string;
              created_at: Date;
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

export default Atributo;
