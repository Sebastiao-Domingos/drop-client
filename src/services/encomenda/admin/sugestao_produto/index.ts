import { api } from "@/infra/api";

export type SugestaoItemEncomendaCreate = {
  // administrador_id: string;
  item_encomenda_id: string;
  nota: string;
  itens_sugestao: {
    produto_id: string;
    especificao?: { tamanho: string; cor: string }[];
  }[];
};

export type SugestaoItemEncomendaAdmin = {
  id: string;
  nota: string;
  administrador_id: string;
  item_encomenda_id: string;
  item_encomenda: {
    id: string;
    encomenda_id: string;
    produto_id: string;
    estado: string;
    quantidade: number;
    preco_venda: number;
    created_at: Date;
    updated_at: Date;
    produto: string;
  };
  item_sugestao: {
    id: string;
    encomenda_id: string;
    produto_id: string;
    estado: string;
    quantidade: number;
    preco_venda: number;
    created_at: Date;
    updated_at: Date;
    produto: string;
  };
  created_at: Date;
  updated_at: Date;
};

class SugestaoItemEncomendaService {
  private readonly BASE_PATH = "/sugestaoItemEncomenda";

  /**
   * create
   */
  public async create(data: SugestaoItemEncomendaCreate) {
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
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getAll
   */
  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: SugestaoItemEncomendaAdmin[];
        }
      >(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default SugestaoItemEncomendaService;
