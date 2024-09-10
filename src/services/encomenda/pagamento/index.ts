import { api } from "@/infra/api";
import { EncomendaCliente } from "..";
import RSA from "@/modules/cryptography/rsa";

export type Pagamento = {
  telefone: string;
};

export type PagamentoQrCode = {
  status_code: string;
  data: {
    id: string;
    timeToLive: string;
  };
};

class PagamentoService {
  /**
   * pagamento
   */
  public async pagamento(data: Pagamento, encomenda_id: string) {
    const rsa = new RSA();
    const info = rsa.encrypt(JSON.stringify(data));

    const response = await api
      .post<{}, { data: EncomendaCliente }>(
        `/pagamento/telefone/${encomenda_id}`,
        {
          info,
        }
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async pagamentoPorQrcode(encomenda_id: string) {
    const response = await api
      .post<{}, { data: PagamentoQrCode }>(`/pagamento/qrCode/${encomenda_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default PagamentoService;
