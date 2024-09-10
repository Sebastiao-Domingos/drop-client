import { api } from "@/infra/api";
import { cookies } from "next/headers";
import SessionService from ".";
import TokenService from "../token";

export type FornecidorData = {
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

export type FornecidorDataResponseLogin = {
  token?: string;
  nome: string;
  email: string;
  telefone: string;
  usuario_id: string;
  tipo_usuario: string;
};

export type Fornecedor = {
  id?: string;
  nome: string;
  nif: string;
  endereco_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type FornecedorGetResponse = {
  fornecedor: Fornecedor[];
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  peerPage: number;
  lastPage: number;
};

export type SearchFornecedorParams = {
  nome: string;
  currentPage: number;
  peerPage: number;
};

export type DataFornecedor = {
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

export type FornecedorRecuperarSenha = {
  code: string;
  whatsapp: string;
  senha: string;
};

class FornecidorService {
  private readonly BASE_PATH = "/fornecedor";
  /**
   * create
   */
  public async create(fornecidor: FornecidorData) {
    const response = api
      .post<{}, { data: FornecidorData }>("/cadastro/fornecedor", fornecidor)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * name
   */
  public async getFornecedor(params: URLSearchParams) {
    const response = await api
      .get<{}, { data: FornecedorGetResponse[] }>(
        `/fornecedor?${params.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getDataFornecedor
   */
  public async getDataFornecedor(fornecedor_id: string) {
    const response = await api
      .get<{}, { data: DataFornecedor }>(`/fornecedor/dados/${fornecedor_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * recoverPassword
   */
  public async recoverPassword({
    whatsapp,
    code,
    senha,
  }: FornecedorRecuperarSenha) {
    const response = await api
      .put<{}, { data: FornecidorDataResponseLogin }>(
        `/fornecedor/recupera/senha/${whatsapp}`,
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
}

export default FornecidorService;
