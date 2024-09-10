import { api } from "@/infra/api";

export type FornecidorData = {
  id?: string;
  nome: string;
  email: string;
  nif: string;
  whatsapp: string;
  senha: string;
  municipio_id: string;
  bairro: string;
  rua: string;
  ponto_referencia: string;
};

export type ConfirmacaoFornecedorDataCreation = {
  fornecedor_id: string;
  item_encomenda_id: string;
  quantidade: number;
};

export type ConfirmacaoFornecedorData = {
  id: string;
  fornecedor_id: string;
  item_encomenda_id: string;
  estado: "pendente" | "confirmado" | "desconfirmado";
  quantidade: number;
};
export type ConfirmacaoFornecedorDataUpdate = {
  estado: "pendente" | "confirmado" | "desconfirmado";
  quantidade?: number;
  id: string;
};

export type ConfirmacaoFornecedorDataResponse = {
  id: string;
  fornecedor_id: string;
  item_encomenda_id: string;
  estado: "pendente" | "confirmado" | "desconfirmado";
  quantidade: number;
  fornecedor: {
    nome: string;
    nif: string;
    endereco_id: string;
  };
  item_encomenda: {
    id: string;
    encomenda_id: string;
    produto_id: string;
    quantidade: number;
    preco_venda: number;
    tamanho?: string;
    cor?: string;
    produto: {
      id: string;
      nome: string;
      preco: number;
      imagem: string;
      descricao: string;
      referencia: string;
    };
  };
};

export type ResponseDataConfirmItemFornecedor = {
  confirmacao_fornecedor: ConfirmacaoFornecedorDataResponse[];
  currentPage: number;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number | null;
  total: number;
};

export type searchConfirmItemFornecedor = {
  peerPage: number;
  currentPage: number;
  estado: "pendente" | "confirmado" | "desconfirmado" | "comprado" | "pago";
};
class ConfirmacaoFornecidorService {
  private readonly BASE_PATH = "/confirmacaoFornecedor";

  /**
   * create
   */
  public async create(data: ConfirmacaoFornecedorDataCreation) {
    const response = await api
      .post<
        {},
        {
          data: ConfirmacaoFornecedorData;
        }
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update({ id, ...others }: ConfirmacaoFornecedorDataUpdate) {
    const response = await api
      .put<
        {},
        {
          data: ConfirmacaoFornecedorData;
        }
      >(`${this.BASE_PATH}/${id}`, others)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAllFornecedorConfirmacao(params: URLSearchParams) {
    const response = await api
      .get<
        {},
        {
          data: ResponseDataConfirmItemFornecedor;
        }
      >(`${this.BASE_PATH}/fornecedor?${params.toString()}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getDetalheConfirmacaoFornecedor(id_confirmacao: string) {
    const response = await api
      .get<
        {},
        {
          data: ConfirmacaoFornecedorDataResponse;
        }
      >(`${this.BASE_PATH}/detalhe/${id_confirmacao}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getDetalheConfirmacaoAdmin(id_confirmacao: string) {
    const response = await api
      .get<
        {},
        {
          data: ConfirmacaoFornecedorDataResponse;
        }
      >(`${this.BASE_PATH}/detalhe/admin/${id_confirmacao}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getConfirmacoesDoFornecedor(
    fornecedor_id: string,
    params: URLSearchParams
  ) {
    const response = await api
      .get<
        {},
        {
          data: ResponseDataConfirmItemFornecedor;
        }
      >(
        `${
          this.BASE_PATH
        }/fornecedor/admin/${fornecedor_id}?${params.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
  public async getConfirmacoesDoItem(id_item_encomenda: string) {
    const response = await api
      .get<
        {},
        {
          data: ConfirmacaoFornecedorDataResponse[];
        }
      >(`${this.BASE_PATH}/fornecedor/item/${id_item_encomenda}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default ConfirmacaoFornecidorService;
