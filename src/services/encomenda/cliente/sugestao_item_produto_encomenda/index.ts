import { api } from "@/infra/api";
import Produto from "../../../../../@types/Produto";

export type SugestaoItemEncomendaCliente = {
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
    tamanho: string | null;
    cor: string | null;
    activo: boolean;
    encomenda: {
      codigo: string;
    };
    created_at: Date;
    updated_at: Date;
    produto: Produto;
  };
  itens_sugestao: ItemSugestao[];
  created_at: Date;
  updated_at: Date;
}[];

export type ItemSugestao = {
  id: string;
  encomenda_id: string;
  produto_id: string;
  estado: string;
  // quantidade: number;
  preco_venda: number;
  tamanho: string | null;
  cor: string | null;
  created_at: Date;
  updated_at: Date;
  produto: Produto;
  especificacao: {
    id: string;
    tamanho: string;
    cor: string;
    produto_id: string;
    created_at: string;
    updated_at: string;
  }[];
};

export type ValidateSugestaoClienteData = {
  produto_id: string;
  tamanho?: string;
  cor?: string;
};

export type DenySugestaoClienteData = {
  acao: "prosseguir" | "cancelar";
};

class SugestaoItemEncomendaService {
  private readonly BASE_PATH = "/sugestaoItemEncomenda";

  public async getAll(estado: "pendente" | "negado" | "aprovado" = "pendente") {
    const response = await api
      .get<{}, { data: SugestaoItemEncomendaCliente[] }>(
        `${this.BASE_PATH}/cliente?estado=${estado}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async deny(sugestaoId: string, data: DenySugestaoClienteData) {
    const response = await api
      .put<
        {},
        {
          data: {
            acao: "prosseguir";
          };
        }
      >(`${this.BASE_PATH}/nega/${sugestaoId}`, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async approve(sugestaoId: string, data: ValidateSugestaoClienteData) {
    const response = await api
      .put<
        {},
        {
          data: {
            administrador_id: string;
            item_encomenda_id: string;
            nota: string;
            itens_sugestao: {
              produto_id: string;
              tamanho?: string;
              cor?: string;
            };
          };
        }
      >(`${this.BASE_PATH}/aprova/${sugestaoId}`, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default SugestaoItemEncomendaService;
