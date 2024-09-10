import { api } from "@/infra/api";

export type EnvioData = {
  nome: string;
  tempo_envio: string;
  preco_envio: string;
  disponibilidade: string;
};

export type EnvioResponse = EnvioData & {
  id: string;
};

class EnvioService {
  private readonly BASE_PATH = "/envio";

  /**
   * create
   */
  public async create(data: EnvioData) {
    const response = await api
      .post<
        {},
        {
          data: EnvioData;
        }
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(envio: EnvioResponse) {
    const { id, nome, disponibilidade, preco_envio, tempo_envio } = envio;
    const response = await api
      .put<
        {},
        {
          data: EnvioData;
        }
      >(`${this.BASE_PATH}/${id}`, {
        nome: nome,
        tempo_envio: tempo_envio,
        preco_envio: preco_envio,
        disponibilidade: disponibilidade,
      })
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
          data: EnvioResponse[];
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

export default EnvioService;
