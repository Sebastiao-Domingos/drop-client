import { api } from "@/infra/api";
import TokenService from "@/services/token";

export type PickupRecuperarSenha = {
  code: string;
  whatsapp: string;
  senha: string;
};

class PickupRecuperarSenhaService {
  /**
   * recoverPassword
   */
  public async recoverPassword({
    whatsapp,
    code,
    senha,
  }: PickupRecuperarSenha) {
    const response = await api
      .put<{}, { data: any }>(`/enderecoRecolha/recupera/senha/${whatsapp}`, {
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

export default PickupRecuperarSenhaService;
