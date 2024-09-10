import { isEmptyString } from "@/helpers/functions/isEmptyString";
import {
  Encomenda,
  EncomendaCliente,
  EncomendaClienteFiltro,
  EncomendaTratamento,
} from "@/services/encomenda";

class EncomendaClienteController {
  public async encomendar(data: Encomenda) {
    const response = await fetch("/api/encomenda", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await response.json();

    // console.log("RESPONSE:", response);

    if (isEmptyString(json.id)) {
      throw new Error(json.error);
    }

    return json;
  }

  public async encomendasPorCliente(
    filtro: Partial<EncomendaClienteFiltro>
  ): Promise<{
    encomenda: EncomendaCliente[];
    lastPage: number;
    nextPage: number;
    peerPage: number;
    prevPage: number;
    total: number;
    currentPage: number;
  }> {
    const params = new URLSearchParams();

    Object.entries(filtro).forEach((entry) =>
      params.append(entry[0], entry[1].toString())
    );

    const response = await fetch("/api/encomenda?" + params.toString(), {
      method: "GET",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  public async encomendaDetalhe(
    encomenda_id: string
  ): Promise<EncomendaCliente> {
    const response = await fetch(
      `/api/encomenda/cliente?encomenda=${encomenda_id}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Usuário não autorizado");
      }
      throw new Error(json.error);
    }

    return json;
  }

  public async cancelarEncomenda(
    encomenda_id: string
  ): Promise<EncomendaTratamento> {
    const response = await fetch(`/api/encomenda/cliente`, {
      method: "PUT",
      body: JSON.stringify({ encomenda_id }),
    });

    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default EncomendaClienteController;
