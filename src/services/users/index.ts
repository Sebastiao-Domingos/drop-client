import { api } from "@/infra/api";
import TokenService from "../token";

export type LoggedUser = {
  token?: string;
  tipo_usuario: string;
  usuario: {
    id: string;
    nome: string;
    tipo_administrador: string;
    created_at: Date;
    updated_at: Date;
  };
};

export type LoginData = {
  contacto: string;
  senha: string;
  tipo_usuario:
    | "administrador"
    | "cliente"
    | "fornecedor"
    | "estafeta"
    | "recolha";
};

class SessionService {
  /**
   * session
   */
  public async session({ contacto, senha, tipo_usuario }: LoginData) {
    // try {
    const response = await api
      .post<{}, { data: LoggedUser }>("/session", {
        contacto,
        senha,
        tipo_usuario,
      })
      .then((res) => res.data);

    TokenService.saveToken(response.token!);

    delete response.token;

    return {
      status: 200,
      response,
    };
  }

  public async getUserData() {
    const response = await api
      .get<{}, { data: LoggedUser }>("/usuario/dados")
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public cleanToken() {
    console.log("/api/session/logout");
    TokenService.removeToken();
  }
}

export default SessionService;
