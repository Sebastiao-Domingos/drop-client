import { EncomendaAdmin } from "@/services/encomenda";
import { Expedir } from "@/services/encomenda/tratamento/Expedir";

class ExpedirController {
  private static readonly url = "/api/encomenda/tratamento/expedir";

  /**
   * expedicao
   */
  public async expedicao(data: Expedir): Promise<EncomendaAdmin> {
    const response = await fetch(ExpedirController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default ExpedirController;
