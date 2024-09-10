import { api } from "@/infra/api";

export type AdminPassword = {
  senha_atual: string;
  nova_senha: string;
};

class AdminPasswordService {
  /**
   * execute
   */
  public async execute(data: AdminPassword) {
    const response = await api
      .put<{}, { data: { message: string } }>("/administrador/novasenha", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default AdminPasswordService;
