import { api } from "@/infra/api";

export type FornecedorPassword = {
  senha_atual: string;
  nova_senha: string;
};

class FornecedorPasswordService {
  /**
   * execute
   */
  public async execute(data: FornecedorPassword) {
    const response = await api
      .put<{}, { data: { message: string } }>("/fornecedor/senha", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default FornecedorPasswordService;
