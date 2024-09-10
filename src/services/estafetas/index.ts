import { api } from "@/infra/api";
import TokenService from "../token";
import { FornecedorRecuperarSenha } from "../users/Fornecedor";
import { AgentePickUpData } from "../pontoPickup";
import { Estado } from "../encomenda/admin/estado_encomenda";

export type EstafetasData = {
  nome: string;
  municipio_id: string;
  bairro: string;
  rua: string;
  ponto_referencia: string;
  whatsapp: string;
};

export type EstafetaDataResponseLogin = {
  token?: string;
  nome: string;
  email: string;
  telefone: string;
  usuario_id: string;
  tipo_usuario: string;
};

export type Estafeta = {
  whatsapp: string;
  tipo_usuario: string;
  estafeta: {
    nome: string;
    nif: string;
    endereco_id: string;
    created_at: Date;
    updated_at: Date;
  };
  endereco: {
    id: string;
    bairro: string;
    rua: string;
    municipio_id: string;
    ponto_referencia: string;
    municipio: {
      id: string;
      nome: string;
      provincia_id: string;
      provincia: {
        id: string;
        nome: string;
      };
    };
  };
};

export type EstafetaGetResponse = {
  estafeta: {
    id: string;
    nome: string;
    endereco_id: string;
    valido: false;
    created_at: Date;
    updated_at: Date;
  }[];
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  peerPage: number;
  lastPage: number;
};
export type SearchEstafetaParams = {
  nome: string;
  currentPage: number;
  peerPage: number;
};

export type SearchEstafetaEncomdaParams = {
  entregue: number | string;
  currentPage: number;
  // peerPage: number;
};

export type DataEstafeta = {
  fornecedor: {
    id: string;
    nome: string;
    nif: string;
    endereco: {
      id: string;
      bairro: string;
      municipio_id: string;
      rua: string;
      ponto_referencia: string;
      municipio: {
        id: string;
        nome: string;
        provincia_id: string;
        provincia: {
          id: string;
          nome: string;
        };
      };
    };
  };
  contactos: [
    {
      id: string;
      nome: string;
      conteudo: string;
      tipo_contacto_id: string;
      usuario_id: string;
      tipo_usuario: any;
      tipo_contacto: {
        id: string;
        nome: string;
      };
    }
  ];
};

export type EncomendaEstafeta = {
  id: string;
  estafeta_id: string;
  encomenda_id?: string;
  endereco_recolha_id?: string;
  entregue: boolean;

  encomenda: {
    id: string;
    valor_total: number;
    codigo: string;
    envio_id: string;
    modo_pagamento_id: string;
    cliente_id: string;
    estado_encomenda_id: string;
    endereco_faturacao_id: string;
    endereco_faturacao: {
      id: string;
      bairro: string;
      rua: string;
      municipio_id: string;
      ponto_referencia: string;
      municipio: {
        id: string;
        nome: string;
        provincia_id: string;
        provincia: {
          id: string;
          nome: string;
        };
      };
    };
    envio: {
      id: string;
      tipo: string;
      tempo_envio: string;
      preco_envio: string;
      endereco_entrega_id: string;
      endereco_recolha_id: string;
      endereco_entrega: {
        id: string;
        cliente_id: string;
        endereco_id: string;
        descricao: string;
        predefinido: boolean;
        endereco: {
          id: string;
          bairro: string;
          latitude: number;
          longitude: number;
          rua: string;
          municipio_id: string;
          ponto_referencia: string;
          municipio: {
            id: string;
            nome: string;
            provincia_id: string;
            provincia: {
              id: string;
              nome: string;
            };
          };
        };
      };
      endereco_recolha: {
        id: string;
        nome: string;
        endereco_id: string;
        disponibilidade: string;
        tempo_envio: string;
        endereco: {
          id: string;
          bairro: string;
          rua: string;
          latitude: number;
          longitude: number;
          municipio_id: string;
          ponto_referencia: string;
          municipio: {
            id: string;
            nome: string;
            provincia_id: string;
            provincia: {
              id: string;
              nome: string;
            };
          };
        };
      };
      created_at: Date;
      updated_at: Date;
    };
    estado_encomenda: {
      id: string;
      nome: Estado;
      descricao: string;
      created_at: Date;
      updated_at: Date;
    };
    modo_pagamento_encomenda: {
      id: string;
      nome: string;
      imagem: string;
      created_at: Date;
    };
    cliente: {
      id: string;
      nome: string;
      tipo: "Particular" | "Empresa";
      nif: string;
      email: string;
      whatsapp: string;
      senha: string;
    };
    itens_encomenda: [
      {
        id: string;
        encomenda_id: string;
        produto_id: string;
        estado: string;
        quantidade: number;
        preco_venda: number;
        created_at: Date;
        updated_at: Date;
        produto: string;
      }
    ];
  };
  entrega_pickup: {
    id: string;
    entrega_id: string;
    randon_code: string;
  };
  created_at: Date;
  updated_at: Date;
};

export type EncomendaAllData = {
  id: string;
  valor_total: number;
  codigo: string;
  envio_id: string;
  modo_pagamento_id: string;
  cliente_id: string;
  estado_encomenda_id: string;
  endereco_faturacao_id: string;
  endereco_faturacao: {
    id: string;
    bairro: string;
    rua: string;
    municipio_id: string;
    ponto_referencia: string;
    municipio: {
      id: string;
      nome: string;
      provincia_id: string;
      provincia: {
        id: string;
        nome: string;
      };
    };
  };
  envio: {
    id: string;
    tipo: string;
    tempo_envio: string;
    preco_envio: string;
    endereco_entrega_id: string;
    endereco_recolha_id: string;
    endereco_entrega: {
      id: string;
      cliente_id: string;
      endereco_id: string;
      descricao: string;
      predefinido: boolean;
      endereco: {
        id: string;
        bairro: string;
        rua: string;
        municipio_id: string;
        ponto_referencia: string;
        municipio: {
          id: string;
          nome: string;
          provincia_id: string;
          provincia: {
            id: string;
            nome: string;
          };
        };
      };
    };
    endereco_recolha: {
      id: string;
      nome: string;
      endereco_id: string;
      disponibilidade: string;
      tempo_envio: string;
      endereco: {
        id: string;
        bairro: string;
        rua: string;
        municipio_id: string;
        ponto_referencia: string;
        municipio: {
          id: string;
          nome: string;
          provincia_id: string;
          provincia: {
            id: string;
            nome: string;
          };
        };
      };
    };
    created_at: Date;
    updated_at: Date;
  };
  estado_encomenda: {
    id: string;
    nome: string;
    descricao: string;
    created_at: Date;
    updated_at: Date;
  };
  modo_pagamento_encomenda: {
    id: string;
    nome: string;
    imagem: string;
    created_at: Date;
  };
  cliente: {
    id: string;
    nome: string;
    tipo: "Particular" | "Empresa";
    nif: string;
    email: string;
    whatsapp: string;
    senha: string;
  };
  itens_encomenda: [
    {
      id: string;
      encomenda_id: string;
      produto_id: string;
      estado: string;
      quantidade: number;
      preco_venda: number;
      created_at: Date;
      updated_at: Date;
      produto: string;
    }
  ];
};

export type EncomendaEstafetaResponse = {
  entrega: EncomendaEstafeta[];
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
  total: number;
  currentPage: number;
};

export type CriarEntregaData = {
  codigo_encomenda: string;
  randon_code: string;
};

export type ValidarEncomendaClienteData = {
  randon_code: string;
  encomenda_id: string;
};

export type CriarCodigoDaEntregaParaPickupResponse = {
  id: string;
  entrega_id: string;
  randon_code: string;
  created_at: Date;
  updated_at: Date;
};

export type EstafetaData = {
  tipo_usuario: string;
  usuario: {
    id: string;
    nome: string;
    valido: boolean;
    created_at: Date;
    updated_at: Date;
    endereco: EnderecoType;
  };
  contactos: ContatoType[];
};

export type ContatoType = {
  conteudo: string;
  tipo_usuario: string;
  created_at: Date;
  updated_at: Date;
  tipo_contacto: {
    nome: string;
  };
};

export type EnderecoType = {
  id: string;
  bairro: string;
  rua: string;
  ponto_referencia: string;
  municipio: {
    id: string;
    nome: string;
    provincia: {
      id: string;
      nome: string;
    };
  };
};

class EstafetaService {
  private readonly BASE_PATH = "/estafeta";

  /**
   * create
   */
  public async create(data: EstafetasData) {
    const response = await api
      .post<
        {},
        {
          data: Estafeta;
        }
      >("/cadastro/estafeta", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async criarEntrega(data: CriarEntregaData) {
    const response = await api
      .post<
        {},
        {
          data: EncomendaEstafeta;
        }
      >("/estafeta/entrega/qrcode", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async gerarCodigoDaEncomendaParaCliente(encomenda_id: string) {
    const response = await api
      .post<{}, { data: { message: string } }>(
        `/estafeta/encomenda/entrega/${encomenda_id}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async gerarNovoCodigoDaEncomendaParaCliente(encomenda_id: string) {
    const response = await api
      .put<{}, { data: { message: string } }>(
        `/estafeta/encomenda/entrega/gera/novo/${encomenda_id}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async validarCodigoDaEncomendaDoCliente(data: ValidarEncomendaClienteData) {
    const response = await api
      .put<{}, { data: { message: string } }>(
        `/estafeta/encomenda/entrega/validate/${data.encomenda_id}`,
        { randon_code: data.randon_code }
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async expedirEncomendaParaCliente(encomenda_id: string) {
    const response = await api
      .put<
        {},
        {
          data: CriarCodigoDaEntregaParaPickupResponse;
        }
      >(`/estafeta/expedir/encomenda/${encomenda_id}`)
      .then((res) => res.data);
    return {
      status: 200,
      response,
    };
  }

  public async criarCodigoDaEntregaParaPickup(entrega_id: string) {
    const response = await api
      .post<
        {},
        {
          data: CriarCodigoDaEntregaParaPickupResponse;
        }
      >(`/estafeta/entrega/pickup/${entrega_id}`)
      .then((res) => res.data);
    return {
      status: 200,
      response,
    };
  }

  public async recoverPassword({
    whatsapp,
    code,
    senha,
  }: FornecedorRecuperarSenha) {
    const response = await api
      .put<{}, { data: EstafetaDataResponseLogin }>(
        `${this.BASE_PATH}/recupera/senha/${whatsapp}`,
        { code, senha }
      )
      .then((res) => res.data);

    TokenService.saveToken(response.token!);

    delete response.token;

    return {
      status: 200,
      response,
    };
  }
  public async getAll(params: URLSearchParams) {
    const response = await api
      .get<
        {},
        {
          data: EstafetaGetResponse;
        }
      >(`${this.BASE_PATH}?${params.toString()}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getEstafetaEncomendas(filtro: string) {
    const response = await api
      .get<
        {},
        {
          data: EncomendaEstafetaResponse;
        }
      >(`${this.BASE_PATH}/encomenda?${filtro}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
  async getEstafetaById(id: string) {
    const response = await api
      .get<{}, { data: EstafetaData }>(`${this.BASE_PATH}/detalhe/${id}`)
      .then((resp) => resp.data);

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

  public async getDataUsuario() {
    const response = await api
      .get<{}, { data: EstafetaData | AgentePickUpData }>("/usuario/dados")
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async getEstafetaEntregaById(id: string) {
    const response = await api
      .get<{}, { data: EncomendaEstafeta }>(`${this.BASE_PATH}/entrega/${id}`)
      .then((resp) => resp.data);

    return {
      status: 200,
      response,
    };
  }

  async getEstafetaEntregaByIdAdmin(id: string) {
    const response = await api
      .get<{}, { data: EncomendaEstafeta }>(
        `${this.BASE_PATH}/entrega/admin/${id}`
      )
      .then((resp) => resp.data);

    return {
      status: 200,
      response,
    };
  }
}

export default EstafetaService;
