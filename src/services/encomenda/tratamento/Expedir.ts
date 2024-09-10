import { api } from "@/infra/api";
import { EncomendaAdmin } from "..";

export type Expedir = {
  tipo: "recolha" | "entrega";
  encomenda_id: string;
};

class ExpedirService {
  /**
   * expedir
   */
  public async expedir({ tipo, encomenda_id }: Expedir) {
    const response = await api
      .post<{}, { data: EncomendaAdmin }>(`/tratamento/expedicao/${tipo}`, {
        encomenda_id,
      })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default ExpedirService;
