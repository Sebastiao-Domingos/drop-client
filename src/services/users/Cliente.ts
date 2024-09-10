import { api } from "@/infra/api";
import TokenService from "../token";
import { cookies } from "next/headers";
import SessionService, { LoggedUser } from ".";

export type Cliente = {
  id: string;
  nome: string;
  tipo: "Particular" | "Empresa";
  nif: string;
  endereco_id: string;
  created_at: Date;
  updated_at: Date;
};

export type ClienteGetResponse = {
  cliente: Cliente[];
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  peerPage: number;
  lastPage: number;
};

export type SearchClienteParams = {
  nome: string;
  tipo: "Particular" | "Empresa";
  currentPage: number;
  peerPage: number;
};

export type ClienteData = {
  nome: string;
  email: string;
  tipo: "Particular" | "Empresa";
  nif: string;
  whatsapp: string;
  senha: string;
  provincia_id: string;
  bairro: string;
  municipio_id: string;
  rua: string;
  ponto_referencia: string;
};

export type ClienteSession = {
  token: string;
  nome: string;
  email: string;
  telefone: string;
  usuario_id: string;
  tipo_usuario: string;
};

type Session = {
  tipo_usuario: "cliente";
  cliente: {
    created_at: Date;
    endereco_id: string;
    id: string;
    nif: string;
    nome: string;
    tipo: "Particular" | "Empresa";
    updated_at: Date;
    valido: boolean;
  };
  token?: string;
  whatsapp: string;
};

export type DataCliente = {
  cliente: {
    id: string;
    nome: string;
    tipo: "Particular" | "Empresa";
    nif: string;
    email: string;
    whatsapp: string;
    enderecos_entrega: {
      id: string;
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
    }[];
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

export type DataUsuario = {
  tipo_usuario: string;
  usuario: {
    id: string;
    nome: string;
    tipo: "Particular" | "Empresa";
    nif: string;
    email: string;
    valido: boolean;
    whatsapp: string;
    senha: string;
    enderecos_entrega: {
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
    }[];
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

export type ClientUpdateData = {
  nome?: string;
  email?: string;
  municipio_id?: string;
  bairro?: string;
  rua?: string;
  ponto_referencia?: string;
};

export type ClienteRecuperarSenha = {
  code: string;
  whatsapp: string;
  senha: string;
};

class ClienteService {
  public async create(cliente: ClienteData) {
    const response = await api
      .post<{}, { data: Cliente }>("/cadastro/cliente", cliente)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async accountVerification(whatsapp: string, code: string) {
    const response = await api
      .put<{}, { data: Session }>(`/cliente/code/verify/${whatsapp}`, {
        code,
      })
      .then((res) => res.data);

    TokenService.saveToken(response.token!);

    delete response.token;

    response.tipo_usuario = "cliente";

    return { status: 200, response };
  }

  public async requestNewVerificationCode(whatsapp: string) {
    const response = await api
      .post<{}, { data: { message: string } }>(`/code/${whatsapp}`)
      .then((res) => res.data);

    return { status: 200, response };
  }

  public async getClientes(params: URLSearchParams) {
    const response = await api
      .get<{}, { data: ClienteGetResponse }>(`/cliente?${params.toString()}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getDataCliente
   */
  public async getDataCliente(cliente_id: string) {
    const response = await api
      .get<{}, { data: DataCliente }>(`/cliente/dados/${cliente_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getDataUsuario
   */
  public async getDataUsuario() {
    const response = await api
      .get<{}, { data: DataUsuario }>("/usuario/dados")
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
  /**
   * getDataUsuario
   */
  public async update(data: ClientUpdateData) {
    const response = await api
      .put<{}, { data: DataCliente }>("/cliente/dados", data)
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
  }: ClienteRecuperarSenha) {
    const response = await api
      .put<{}, { data: LoggedUser }>(`/cliente/recupera/senha/${whatsapp}`, {
        code,
        senha,
      })
      .then((res) => res.data);

    TokenService.saveToken(response.token!);

    delete response.token;

    return {
      status: 200,
      response,
    };
  }
}

export default ClienteService;
