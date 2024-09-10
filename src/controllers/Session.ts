import { User } from "@/contexts/AuthenticationProvider";

export type SessionData = {
  contacto: string;
  senha: string;
  tipo_usuario:
    | "administrador"
    | "cliente"
    | "fornecedor"
    | "estafeta"
    | "recolha";
};

class SessionController {
  /**
   * login
   */
  public async login(data: SessionData) {
    const body = await fetch("/api/session/", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (body.error !== undefined) {
      throw new Error(body.error);
    }

    return body;
  }

  public async getUserData(): Promise<User> {
    const response = await fetch("/api/session/user", {
      // next: { revalidate: 60 },
      // cache: "reload",
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        "Erro ao carregar o usuário. Certifique-se que está logado e tente novamente"
      );
    }

    return await response.json();
  }
}

export default SessionController;
