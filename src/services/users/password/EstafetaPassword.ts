import { api } from "@/infra/api";

export type EstafetaPassword = {
  senha_atual: string;
  nova_senha: string;
};

class EstafetaPasswordService {
  /**
   * execute
   */
  public async execute(data: EstafetaPassword) {
    const response = await api
      .put<{}, { data: { message: string } }>("/estafeta/dados/senha", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default EstafetaPasswordService;
