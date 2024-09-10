import { api } from '@/infra/api';
import { PontoPickupData } from '../pontoPickup';
import Marca from '../products/Marca';
import { SubProdutoModel } from '../products/SubProduto';

export type QrcodeData = {
  id: string;
  codigo_encomenda: string;
  randon_code: string;
  created_at: Date;
  updated_at: Date;
};

export type ConfirmacaoFornecedor = {
  id: string;
  estado: 'pendente' | 'confirmado' | 'desconfirmado' | 'comprado' | 'pago';
  quantidade: number;
  fornecedor: {
    id: string;
    nome: string;
    nif: string;
  };
};

export type Estado =
  | 'Cancelada'
  | 'Processamento'
  | 'Confirmação'
  // | "Expedidas"
  | 'Pendente'
  // | "Entregada"
  | 'Tratamento'
  | 'Expedição'
  | 'Expedida'
  // | "Confimado"
  | 'Pagamento'
  | 'Entregue'
  | ''
  | 'todos';

export type EncomendaTratamento = {
  id: string;
  valor_total: string;
  codigo: string;
  envio_id: string;
  pago: boolean;
  modo_pagamento_id: string;
  cliente_id: string;
  estado_encomenda_id: string;
  endereco_faturacao_id: string;
  created_at: Date;
  updated_at: Date;

  qrcode_gerado: boolean;
  promocao_id: null;
  cliente: {
    id: string;
    nome: string;
    nif: string;
    tipo: 'Particular' | 'Empresa';
  };
  qrcode?: {
    codigo_encomenda: string;
    created_at: Date;
    id: string;
    randon_code: string;
    updated_at: Date;
  };
  envio: {
    id: string;
    tipo: 'entrega' | 'recolha';
    endereco_entrega?: {
      id: string;
      endereco: {
        id: string;
        municipio: {
          id: string;
          nome: string;
          provincia: {
            nome: string;
          };
        };
        bairro: string;
        rua: string;
        ponto_referencia: string;
        latitude: string;
        longitude: string;
      };
    };
    endereco_recolha?: PontoPickupData;
    preco_envio: number;
    tempo_envio: string;
  };
  modo_pagamento: null;
  endereco_faturacao: {
    id: string;
    bairro: string;
    ponto_referencia: string;
    municipio: {
      id: string;
      nome: string;
      provincia: {
        id: string;
        nome: string;
        pais: {
          id: string;
          nome: string;
        };
      };
    };
    latitude: string;
    longitude: string;
    rua: string;
  };
  estado_encomenda: {
    id: string;
    nome: Estado;
    descricao: string;
  };
  itens_encomenda: ItemEncomenda[];
};

export type Encomenda = {
  // envio_id: string;
  tipo_envio: 'entrega' | 'recolha';
  endereco_tipo_id: string;
  dados_endereco_faturacao: {
    municipio_id: string;
    ponto_referencia: string;
    bairro: string;
    rua: string;
    latitude: string;
    longitude: string;
  };
};

export type EncomendaClienteFiltro = {
  cliente_id?: string;
  estado_encomenda_id: string;
  estado: Estado[];
  tipo_envio: 'recolha' | 'entrega';
  modo_pagamento_id: string;
  envio_id: string;
  currentPage: number;
  peerPage: number;
  estado_tratamento: 'ativo' | 'completa';
  qrcode_gerado: '1' | '0';
  associado_estafeta: '1' | '0';
};

export type EncomendaAdminFiltro = {
  estado_encomenda_id: string;
  estado: string;
  tipo_envio: 'recolha' | 'entrega';
  modo_pagamento_id: string;
  envio_id: string;
  currentPage: number;
  peerPage: number;
  estado_tratamento: 'ativo' | 'completa';
};

export type EncomendaGetData = {
  id: string;
  valor_total: number;
  pago: boolean;
  codigo: string;
  estado_encomenda_id: string;
  envio_id: string;
  cliente_id: string;
  modo_pagamento_id: string;
  endereco_entrega_id: string;
  endereco_faturacao_id: string;
  created_at: Date;
  updated_at: Date;
  cliente: {
    id: string;
    nome: string;
    nif: string;
    tipo: string;
  };
  envio: {
    id: string;
    tipo: 'entrega' | 'recolha';
    endereco_entrega?: {
      id: string;
      endereco: {
        id: string;
        municipio: {
          id: string;
          nome: string;
          provincia: {
            nome: string;
          };
        };
        bairro: string;
        rua: string;
        ponto_referencia: string;
        latitude: string;
        longitude: string;
      };
    };
    endereco_recolha?: PontoPickupData;
    preco_envio: number;
    tempo_envio: string;
  };
  modo_pagamento: {
    id: string;
    nome: string;
    imagem: string;
  };
  endereco_entrega: {
    id: string;
    bairro: string;
    ponto_referencia: string;
    municipio: {
      id: string;
      nome: string;
      provincia: {
        id: string;
        nome: string;
        pais: {
          id: string;
          nome: string;
        };
      };
    };
    latitude: string;
    longitude: string;
    rua: string;
  };
  endereco_faturacao: {
    id: string;
    bairro: string;
    municipio: {
      id: string;
      nome: string;
      provincia: {
        id: string;
        nome: string;
        pais: {
          id: string;
          nome: string;
        };
      };
    };
    latitude: string;
    longitude: string;
    rua: string;
  };
  estado_encomenda: {
    id: string;
    nome: Estado;
    descricao: string;
  };
};

export type ItemEncomendaCliente = {
  id: string;
  preco_venda: string;
  quantidade: number;
  cor?: string;
  tamanho?: string;
  produto: {
    id: string;
    nome: string;
    preco: number;
    imagem: string;
  };
};

export type EncomendaCliente = EncomendaGetData & {
  itens_encomenda: ItemEncomendaCliente[];
};

export type ItemEncomenda = {
  id: string;
  preco_venda: string;
  quantidade: number;
  tamanho: string;
  cor: string;
  estado: 'pendente' | 'confirmado' | 'processado';
  produto: {
    id: string;
    nome: string;
    preco: string;
    imagem: string;
    referencia: string;
    marca: {
      id: string;
      nome: string;
      imagem: string;
    };
    sub_produto: SubProdutoModel;
    stock: {
      id: string;
      quantidade: number;
      preco_venda: string;
      fornecedor: {
        id: string;
        nome: string;
        nif: string;
      };
    }[];
  };
  confirmacao_fornecedor: ConfirmacaoFornecedor[];
  sugestao: {
    id: string;
    nota: string;
    estado: 'aprovado' | 'negado' | 'pendente';
    item_encomenda_id: string;
  }[];
};

export type EncomendaAdmin = EncomendaTratamento;

export type DataProcessingOrders = {
  item_id?: string;
  encomenda_id?: string;
};
class EncomendaService {
  private readonly BASE_PATH = '/encomenda';

  public async encomenda(data: Encomenda) {
    const response = await api
      .post<
        {},
        {
          data: EncomendaGetData;
        }
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async cancelarEncomenda(id: string) {
    const response = await api
      .put<
        {},
        {
          data: EncomendaGetData;
        }
      >(`${this.BASE_PATH}/cancela?id=${id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async encomendaPorCliente(filtro: string) {
    const response = await api
      .get<
        {},
        {
          data: {
            encomenda: EncomendaCliente[];
            lastPage: number;
            nextPage: number;
            peerPage: number;
            prevPage: number;
            total: number;
            currentPage: number;
          };
        }
      >(`${this.BASE_PATH}/filtro?${filtro}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async encomendaAdmin(filtro: string) {
    const response = await api
      .get<
        {},
        {
          data: {
            encomenda: EncomendaAdmin[];
            lastPage: number;
            nextPage: number;
            peerPage: number;
            prevPage: number;
            total: number;
            currentPage: number;
          };
        }
      >(`${this.BASE_PATH}/admin/filtro?${filtro}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async encomendaDetalhe(encomenda_id: string) {
    const response = await api
      .get<
        {},
        {
          data: EncomendaTratamento;
        }
      >(`${this.BASE_PATH}/detalhe/${encomenda_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async encomendaDetalheAdministrador(encomenda_id: string) {
    const response = await api
      .get<
        {},
        {
          data: EncomendaTratamento;
        }
      >(`${this.BASE_PATH}/detalhe/admin/${encomenda_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  ///encomenda/processa/item/{id}
  public async processarEncomenda(data: DataProcessingOrders) {
    const response = await api
      .put<
        {},
        {
          data: EncomendaGetData;
        }
      >(`${this.BASE_PATH}/processa/item/${data.item_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  ////encomenda/processa/encomenda/{encomenda_id}
  public async processarEncomendaComFalha(data: DataProcessingOrders) {
    const response = await api
      .put<
        {},
        {
          data: {
            message: string;
          };
        }
      >(`${this.BASE_PATH}/processa/encomenda/${data.encomenda_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  //encomenda/tria/encomenda/{encomenda_id}
  public async confirmarEncomendaComFalha(data: DataProcessingOrders) {
    const response = await api
      .put<
        {},
        {
          data: {
            message: string;
          };
        }
      >(`/encomenda/tria/encomenda/${data.encomenda_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default EncomendaService;
