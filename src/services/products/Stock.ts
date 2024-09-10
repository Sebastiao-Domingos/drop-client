import { api } from "@/infra/api";

export type StockDataCreation = {
  produto_id: string;
  quantidade: number;
  preco_venda: number;
};
export type StockDataEdit = {
  id: string;
  preco_venda: number;
  quantidade: number;
};

export type StockDataResponse = {
  id: string;
  fornecedor_id: string;
  produto_id: string;
  quantidade: 0;
  preco_venda: string;
  created_at: Date;
  updated_at: Date;
  produto: {
    id: string;
    nome: string;
    online: true;
    descricao: string;
    referencia: string;
    preco: 0;
    sub_produto: {
      id: string;
      nome: string;
    };
    marca: {
      id: string;
      nome: string;
      imagem: string;
    };
    created_at: Date;
    caracteristica: [
      {
        id: string;
        valor: string;
        atributo: {
          id: string;
          nome: string;
        };
      }
    ];
  };
  fornecedor: {
    nome: string;
    nif: string;
    endereco_id: string;
    created_at: Date;
    updated_at: Date;
  };
};

export type StockDataResponseNew = {
  id: string;
  quantidade: number;
  preco_venda: number;
  fornecedor_id: string;
  produto_id: string;
  produto: {
    id: string;
    nome: string;
    referencia: string;
    descricao: string;
    imagem: string;
    preco: number;
    caracteristica: [
      {
        atributo: {
          id: string;
          nome: string;
        };
        valor: string;
      }
    ];
    imagens_adicionais: [
      {
        url: string;
      }
    ];
    sub_produto: {
      id: string;
      nome: string;
    };
    marca: {
      id: string;
      nome: string;
      imagem: string;
    };
  };
  fornecedor: {
    id: string;
    nome: string;
  };
};
export type StockData = {
  fornecedor_id: string;
  stock: StockDataResponseNew[];
};

export interface FiltedData extends StockData {
  produto_id: string;
  quantidade: number;
  preco_venda: number;
}
export type GetStockResponse = {
  currentPage: number;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
  stock: StockDataResponseNew[];
};
export type GetStockResponseFornecedor = {
  currentPage: number;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
  total: number;
  stock: StockDataResponseNew[];
};

class StockService {
  private readonly BASE_PATH = "/stock";

  /**
   * create
   */
  public async create(data: StockDataCreation[]) {
    const response = await api
      .post<{}, { data: StockData }>(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll(params: string) {
    const response = await api
      .get<
        {},
        {
          data: FiltedData[];
        }
      >(`${this.BASE_PATH}/filtro?${params}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getByFornecedor(params: string) {
    const response = await api
      .get<
        {},
        {
          data: GetStockResponseFornecedor[];
        }
      >(`${this.BASE_PATH}/fornecedor?${params}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getById(id_stock: string) {
    const response = await api
      .get<
        {},
        {
          data: StockDataResponseNew;
        }
      >(`${this.BASE_PATH}/item/${id_stock}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * update
   */
  public async update(data: StockDataEdit) {
    const stock = {
      preco_venda: data.preco_venda,
      quantidade: data.quantidade,
    };

    const response = await api
      .put<
        {},
        {
          data: StockDataCreation & {
            id: string;
            fornecedor_id: string;
          };
        }
      >(`${this.BASE_PATH}/${data.id}`, stock)
      .then((res) => res.data);

    return {
      response,
      status: 200,
    };
  }
  /**
   * delete
   */
  public async delete(id_stock: string) {
    await api.delete<
      {},
      {
        data: undefined;
      }
    >(`${this.BASE_PATH}/${id_stock}`);

    return {
      status: 200,
    };
  }
}

export default StockService;
