import { isEmptyString } from "@/helpers/functions/isEmptyString";
import {
  SearchTratamentoParams,
  TratamentoDataCreation,
  TratamentoDataResponse,
  TratamentoResponseAdministrador,
} from "@/services/encomenda/tratamento";

class TratamentoController {
  private static readonly url = "/api/encomenda/tratamento";

  public async tratarEncomenda(data: TratamentoDataCreation) {
    const response = await fetch("/api/encomenda/tratamento", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await response.json();

    if (isEmptyString(json.id)) {
      throw new Error(json.error);
    }

    return json;
  }

  public async triarEncomenda(data: TratamentoDataCreation) {
    const response = await fetch("/api/encomenda/tratamento/triagem", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  }

  /**
   * obter
   */
  public async obter(
    params: Partial<SearchTratamentoParams>
  ): Promise<TratamentoDataResponse[]> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach((entry) => {
      if (entry[1]) {
        searchParams.append(entry[0], entry[1].toString());
      }
    });
    const response = await fetch(
      `${TratamentoController.url}?${searchParams.toString()}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
  /* obter
   */
  public async obterPorAdministrador(
    params: Partial<SearchTratamentoParams>
  ): Promise<TratamentoResponseAdministrador> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach((entry) => {
      if (entry[1]) {
        searchParams.append(entry[0], entry[1].toString());
      }
    });
    const response = await fetch(
      `${TratamentoController.url}/administrador?${searchParams.toString()}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
}

export default TratamentoController;
