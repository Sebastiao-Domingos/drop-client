import { api } from "@/infra/api";

class TipoContactoService {
  private readonly BASE_PATH = "/tipoContacto";

  public async create({ nome }: { nome: string }) {
    const response = await api
      .post<
        {},
        {
          data: {
            id: string;
            nome: string;
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

  public async update(id: string, { nome }: { nome: string }) {
    const response = await api
      .put<
        {},
        {
          data: {
            id: string;
            nome: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${id}`, { nome })
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

export default TipoContactoService;
