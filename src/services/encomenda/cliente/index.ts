import { api } from "@/infra/api";
import { EncomendaTratamento } from "..";

class EncomendaClienteService {
  /**
   * cancelar
   */
  public async cancelar(encomenda_id: string) {
    const response = await api
      .put<{}, { data: EncomendaTratamento }>(
        `/encomenda/cancela/${encomenda_id}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default EncomendaClienteService;
