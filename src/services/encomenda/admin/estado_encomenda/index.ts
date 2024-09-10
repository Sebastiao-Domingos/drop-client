import { api } from "@/infra/api";

export type Estado =
  | "Cancelada"
  | "Processamento"
  | "Confirmação"
  // | "Expedidas"
  | "Pendente"
  // | "Entregada"
  | "Tratamento"
  | "Expedição"
  | "Expedida"
  // | "Confimado"
  | "Pagamento"
  | "Entregue"
  | ""
  | "todos";

export type EstadoEncomendaData = {
  nome: Estado;
  descricao: string;
};

export type EstadoEncomendaResponse = EstadoEncomendaData & {
  id: string;
};

class EstadoEncomendaService {
  private readonly BASE_PATH = "/estadoEncomenda";

  /**
   * create
   */
  public async create(data: EstadoEncomendaData) {
    const response = await api
      .post<
        {},
        {
          data: EstadoEncomendaData;
        }
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update({ id, descricao, nome }: EstadoEncomendaResponse) {
    const response = await api
      .put<
        {},
        {
          data: EstadoEncomendaData;
        }
      >(`${this.BASE_PATH}/${id}`, {
        nome,
        descricao,
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
          data: EstadoEncomendaResponse[];
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

export default EstadoEncomendaService;
