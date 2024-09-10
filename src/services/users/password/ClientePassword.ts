import { api } from "@/infra/api";

export type ClientePassword = {
  senha_atual: string;
  nova_senha: string;
};

class ClientePasswordService {
  /**
   * execute
   */
  public async execute(data: ClientePassword) {
    const response = await api
      .put<{}, { data: { message: string } }>("/cliente/senha", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default ClientePasswordService;
