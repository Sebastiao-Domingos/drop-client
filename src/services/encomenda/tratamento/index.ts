import { api } from '@/infra/api';
import { Estado } from '../admin/estado_encomenda';
import { EncomendaTratamento } from '..';

export type TratamentoDataCreation = {
  encomenda_id: string;
};

// export type TratamentoDataResponse = {
//   id: string;
//   encomenda_id: string;
//   administrador_id: string;
//   tipo: string;
//   estado: string;
//   created_at: Date;
//   updated_at: Date;
// };

export type SearchTratamentoParams = {
  administrador_id?: string;
  encomenda_id: string;
  estado: 'ativo' | 'completo';
  tipo: 'triagem' | 'processo' | 'expedicao';
  estado_encomenda: Estado;
  currentPage: number;
};

export type ItemData = {
  id: string;
  estado: string;
  preco_venda: number;
  quantidade: number;
  produto: {
    id: string;
    nome: string;
    imagem: string;
    referencia?: string;
    preco: number;
  };
  confirmacao_fornecedor: {
    id: string;
    estado: string;
    quantidade: number;
    fornecedor: {
      id: string;
      nome: string;
      nif: string;
    };
  }[];
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

export type Stock = {
  id: string;
  quantidade: number;
  preco_venda: number;
  fornecedor: {
    id: string;
    nome: string;
    nif: string;
  };
};

export type ItemEncomenda = {
  id: string;
  estado: string;
  preco_venda: number;
  quantidade: number;
  produto: {
    id: string;
    nome: string;
    preco: number;
    imagem: string;
    stock: Stock[];
  };
  confirmacao_fornecedor: ConfirmacaoFornecedor[];
};

export type TratamentoDataResponse = {
  id: string;
  administrador_id: string;
  encomenda_id: string;
  tipo: 'triagem' | 'processo';
  estado: 'ativo' | 'completo';
  created_at: Date;
  updated_at: Date;
  administrador: {
    id: string;
    nome: string;
    tipo_administrador: 'geral' | 'normal';
  };
  encomenda: EncomendaTratamento;
  // {
  //   id: string;
  //   codigo: string;
  //   pago: boolean;
  //   cliente: {
  //     id: string;
  //     nome: string;
  //     nif: string;
  //     tipo: "Particular" | "Empresa";
  //   };
  //   envio: {
  //     id: string;
  //     tipo: "entrega" | "recolha";
  //     endereco_entrega: {
  //       id: string;
  //       endereco: {
  //         id: string;
  //         municipio: {
  //           id: string;
  //           nome: string;
  //           provincia: {
  //             nome: string;
  //           };
  //         };
  //         bairro: string;
  //         rua: string;
  //         ponto_referencia: string;
  //         latitude: string;
  //         longitude: string;
  //       };
  //     };
  //     endereco_recolha?: null;
  //     preco_envio: number;
  //     tempo_envio: string;
  //   };
  //   modo_pagamento: null;
  //   endereco_faturacao: {
  //     id: string;
  //     bairro: string;
  //     ponto_referencia: string;
  //     municipio: {
  //       id: string;
  //       nome: string;
  //       provincia: {
  //         id: string;
  //         nome: string;
  //         pais: {
  //           id: string;
  //           nome: string;
  //         };
  //       };
  //     };
  //     latitude: string;
  //     longitude: string;
  //     rua: string;
  //   };
  //   estado_encomenda: {
  //     id: string;
  //     nome: Estado;
  //     descricao: string;
  //   };
  //   itens_encomenda: ItemEncomenda[];
  // };
};

export type TratamentoResponseAdministrador = {
  tratamento: TratamentoDataResponse[];
  total: number;
  currentPage: number;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
};

class TratamentoService {
  private readonly BASE_PATH = '/tratamento';

  public async tratarEncomenda(data: TratamentoDataCreation) {
    const response = await api
      .post<
        {},
        {
          data: TratamentoDataResponse;
        }
      >(`${this.BASE_PATH}/processamento`, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async triarEncomenda(data: TratamentoDataCreation) {
    const response = await api
      .post<
        {},
        {
          data: TratamentoDataResponse;
        }
      >(`${this.BASE_PATH}/triagem`, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getTratamneto
   */
  public async getTratamneto(params: URLSearchParams) {
    const response = await api
      .get<{}, { data: TratamentoResponseAdministrador }>(
        `${this.BASE_PATH}/busca/geral?${params.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getTratamneto de cada administrador
   */
  public async getTratamnetoAdministrador(params: URLSearchParams) {
    const response = await api
      .get<{}, { data: TratamentoResponseAdministrador }>(
        `${this.BASE_PATH}/busca/normal?${params.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default TratamentoService;
