import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { EstadoEncomendaData, EstadoEncomendaResponse } from "@/services/encomenda/admin/estado_encomenda";
import { EnvioData, EnvioResponse } from "@/services/encomenda/cliente/envio";

class EstadoEncomendaController {
  private static readonly url = "/api/encomenda/estado";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: EstadoEncomendaData) {
    const body = await fetch(EstadoEncomendaController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!body.ok) {
      throw new Error("Erro ao cadastrar modo de envio");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar( data : EstadoEncomendaResponse) {
    const { id , nome ,descricao} = data;
    if (isEmptyString(id)) {
      throw new Error("O id não pode estar vazio");
    }

    const body = await fetch(EstadoEncomendaController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(
        {
          id : id,
          nome:nome  ,
          descricao : descricao
        }
      ),
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar o modo envio");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(estado_id: string) {
    if (estado_id.trim().length === 0) {
      throw new Error("id do envio não pode estar vazio");
    }

    const body = await fetch(EstadoEncomendaController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: estado_id }),
    });

    if (!body.ok) {
      throw new Error("Erro ao apagar o modo de envio");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * obter
   */
  public async obter(): Promise<EstadoEncomendaResponse[]> {
    const body = await fetch(EstadoEncomendaController.url).then((res) => res.json());

    return body.response;
  }
}

export default EstadoEncomendaController;
