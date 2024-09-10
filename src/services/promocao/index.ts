import { api } from "@/infra/api";

export type TipoPromocao =
  | "produto"
  | "subproduto"
  | "subcategoria"
  | "categoria";

export type CreatePromocao = {
  nome: string;
  descricao: string;
  tipo: TipoPromocao;
  desconto: string;
  percentagem: boolean;
  /**
   * string do tipo {@link Date}
   */
  data_inicio: string;
  /**
   * string do tipo {@link Date}
   */
  data_fim: string;

  quantidade_min: number;
  /**
   * produtos
   */
  itens_promocao: string[];
};

export type UpdatePromocao = {
  id: string;
  nome: string;
  /**
   * string do tipo {@link Date}
   */
  data_inicio: string;
  /**
   * string do tipo {@link Date}
   */
  data_fim: string;
  percentagem: boolean;
  desconto: string;
  quantidade_min: number;
  descricao: string;
};

export type PromocaoData = {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoPromocao;
  percentagem: boolean;
  desconto: string;
  /**string do tipo {@link Date} */
  data_inicio: string;
  /**string do tipo {@link Date} */
  data_fim: string;
  quantidade_min: number;
};

export type Promocao = PromocaoData & {
  itens_promocao: {
    id: string;
    produto: {
      id: string;
      nome: string;
      imagem: string;
      descricao: string;
      referencia: string;
      preco: number;
    };
  }[];
  created_at: string;
  updated_at: string;
};

class PromocaoService {
  private readonly BASE_PATH = "/promocao";

  /**
   * create
   */
  public async create(data: CreatePromocao) {
    const response = await api
      .post<
        {},
        {
          data: Promocao & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update({ id, ...others }: UpdatePromocao) {
    const response = await api
      .put<
        {},
        {
          data: Promocao & {
            id: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${id}`, others)
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
          data: Promocao[] &
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

  public async getAllValida() {
    const response = await api
      .get<
        {},
        {
          data: Promocao[] &
            {
              id: string;
              created_at: Date;
            }[];
        }
      >(this.BASE_PATH + "/valida")
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async get(id: string) {
    const response = await api
      .get<
        {},
        {
          data: Promocao &
            {
              id: string;
              created_at: Date;
            }[];
        }
      >(`${this.BASE_PATH}/detalhe/${id}`)
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

export default PromocaoService;
