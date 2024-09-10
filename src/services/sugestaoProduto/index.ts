import { api } from "@/infra/api";

export type Sugestao = {
  id: string;
  nome: string;
  referencia: string;
  preco: number;
  categoria: string;
  marca: string;
  fornecedor_id: string;
  estado: "pendente" | "aprovado" | "negado";
  descricao: string;
  imagem: string;
  created_at: Date;
  updated_at: Date;
};

export type SugestaoCriaProdutoResponse = {
  sugestao: {
    id: string;
    nome: string;
    referencia: string;
    preco: 0;
    categoria: string;
    marca: string;
    fornecedor_id: string;
    estado: string;
    imagem: string;
    created_at: Date;
    updated_at: Date;
  };
  produto: {
    id: string;
    nome: string;
    descricao: string;
    referencia: string;
    preco: 0;
    sub_produto_id: string;
    marca_id: string;
    created_at: Date;
  };
  stock: {
    id: string;
    fornecedor_id: string;
    produto_id: string;
    quantidade: 0;
    preco_venda: string;
    created_at: Date;
    updated_at: Date;
  };
};

export type SugestaoStock = {
  sugestao_id: string;
  produto_id: string;
};

export type SugestaoResponse = {
  sugestoes: Sugestao[];
  total: number;
  currentPage: number;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
};

class SugestaoProdutoService {
  private readonly BASE_PATH = "/sugestao";

  /**
   * createProduto
   */
  public async createProdutoWithStock(sugestao_id: string, data: FormData) {
    const response = await api
      .put<{}, { data: SugestaoCriaProdutoResponse }>(
        `${this.BASE_PATH}/aprova/produto/${sugestao_id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async createSugestaoFromFornecedor(data: FormData) {
    const response = await api
      .post<{}, { data: Sugestao }>(this.BASE_PATH, data, {
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

  /**
   * denySugestaoFromFornecedor
   */
  public async denySugestaoFromFornecedor(sugestao_id: string) {
    const response = await api
      .put<{}, { data: Sugestao }>(`${this.BASE_PATH}/nega/${sugestao_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * createProduto
   */
  public async createStock(data: SugestaoStock) {
    const response = await api
      .put<{}, { data: any }>(`${this.BASE_PATH}/aprova/`, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * filtro
   */
  public async filtro(query: URLSearchParams) {
    if (query.has("admin")) {
      query.delete("admin");
      return await this.sugestaoFiltroAdmin(query);
    }

    return await this.sugestaoFiltro(query);
  }

  /**
   * sugestaoFiltro
   */
  private async sugestaoFiltro(query: URLSearchParams) {
    const response = await api
      .get<{}, { data: SugestaoResponse }>(
        `${this.BASE_PATH}/filtro?${query.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * sugestaoFiltro
   */
  private async sugestaoFiltroAdmin(query: URLSearchParams) {
    const response = await api
      .get<{}, { data: SugestaoResponse }>(
        `${this.BASE_PATH}/filtro/admin?${query.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default SugestaoProdutoService;
