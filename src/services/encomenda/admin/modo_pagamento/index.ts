import { api } from "@/infra/api";

export type ModoPagamentoData = {
  nome: string;
  imagem: string;
};

export type ModoPagamentoResponse = ModoPagamentoData & {
  id: string;
};

class ModoPagamentoService {
  private readonly BASE_PATH = "/modoPagamento";

  /**
   * create
   */
  public async create(data: FormData) {
    const response = await api
      .post<
        {},
        {
          data: ModoPagamentoData;
        }
      >(this.BASE_PATH, data, {
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

  public async update(data: FormData) {
    const id = data.get("id")?.toString();
    data.delete("id");

    const response = await api
      .put<
        {},
        {
          data: ModoPagamentoData;
        }
      >(`${this.BASE_PATH}/${id}`, data, {
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

  public async get() {
    const response = await api
      .get<
        {},
        {
          data: ModoPagamentoResponse[];
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

export default ModoPagamentoService;
