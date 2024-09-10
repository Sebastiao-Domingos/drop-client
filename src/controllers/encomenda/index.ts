import { isEmptyString } from "@/helpers/functions/isEmptyString";
import {
  Encomenda,
  EncomendaAdmin,
  EncomendaCliente,
  EncomendaClienteFiltro,
  EncomendaGetData,
} from "@/services/encomenda";

class EncomendaController {
  public async encomendar(data: Encomenda): Promise<EncomendaGetData> {
    const response = await fetch("/api/encomenda", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const json = await response.json();

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

    Object.entries(filtro).forEach((entry) => {
      const value = entry[1];
      if (Array.isArray(value)) {
        value.forEach((estado) => {
          params.append(entry[0], estado.toString());
        });
      } else {
        params.append(entry[0], value.toString());
      }
    });

    const response = await fetch("/api/encomenda?" + params.toString(), {
      method: "GET",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  public async encomendasAdmin(
    filtro: Partial<EncomendaClienteFiltro>
  ): Promise<{
    encomenda: EncomendaAdmin[];
    lastPage: number;
    nextPage: number;
    peerPage: number;
    prevPage: number;
    total: number;
    currentPage: number;
  }> {
    const params = new URLSearchParams();

    Object.entries(filtro).forEach((entry) => {
      const value = entry[1];

      if (Array.isArray(value)) {
        value.forEach((estado) => {
          params.append(entry[0], estado.toString());
        });
      } else {
        if (value) params.append(entry[0], value.toString());
      }
    });

    const response = await fetch("/api/encomenda/admin?" + params.toString(), {
      method: "GET",
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default EncomendaController;
