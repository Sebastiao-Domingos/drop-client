import { api } from "@/infra/api";

export type PickupPassword = {
  senha_atual: string;
  nova_senha: string;
};

class PickupPasswordService {
  /**
   * execute
   */
  public async execute(data: PickupPassword) {
    const response = await api
      .put<{}, { data: { message: string } }>(
        "/enderecoRecolha/dados/senha",
        data
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default PickupPasswordService;
