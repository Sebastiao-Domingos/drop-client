import { api } from "@/infra/api";
import Produto from "../../../../@types/Produto";
import { EnderecoType } from "@/services/estafetas";

export type PaymentDataReturm = {
  id: string;
  valor_total: number;
  codigo: string;
  envio_id: string;
  modo_pagamento_id: string;
  cliente_id: string;
  estado_encomenda_id: string;
  endereco_faturacao_id: string;
  endereco_faturacao: EnderecoType;
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
      predefinido: true;
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
  };
  estado_encomenda: {
    id: string;
    nome: string;
    descricao: string;
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
  itens_encomenda: {
    id: string;
    encomenda_id: string;
    produto_id: string;
    estado: string;
    quantidade: number;
    preco_venda: number;
    produto: string;
  }[];
  sugestao: {
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
      produto: string;
    };
    itens_sugestao: {
      id: string;
      encomenda_id: string;
      produto_id: string;
      estado: string;
      quantidade: 0;
      preco_venda: 0;
      created_at: Date;
      updated_at: Date;
      produto: Produto;
    }[];
    created_at: Date;
    updated_at: Date;
  };
};

export type PaymentBody = {
  encomenda_id: string;
  info: string;
};

class PaymentService {
  public async efectuarPagamento(body: PaymentBody) {
    const encomenda_id = body.encomenda_id;
    const response = await api
      .post<{}, { data: PaymentDataReturm }>(
        `"/pagamento/telefone/${body.encomenda_id}"`,
        { info: body.info }
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default PaymentService;
