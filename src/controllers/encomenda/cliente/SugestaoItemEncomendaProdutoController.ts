import {
  DenySugestaoClienteData,
  SugestaoItemEncomendaCliente,
  ValidateSugestaoClienteData,
} from "@/services/encomenda/cliente/sugestao_item_produto_encomenda";

export type SugestaoEstado = "pendente" | "negado" | "aprovado";

class SugestaoItemEncomendaController {
  private static readonly url =
    "/api/encomenda/cliente/sugestao-item-produto-encomenda";

  /**
   * validate
   */
  public async validate(data: {
    sugestao_id: string;
    acao: "aprova" | "nega";
    data?: ValidateSugestaoClienteData;
    denyData?: DenySugestaoClienteData;
  }): Promise<
    | {
        acao: string;
      }
    | {
        administrador_id: string;
        item_encomenda_id: string;
        nota: string;
        itens_sugestao: {
          produto_id: string;
          tamanho?: string;
          cor?: string;
        };
      }
  > {
    const response = await fetch(SugestaoItemEncomendaController.url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  /**
   * listarSugestao
   */
  public async listarSugestao(
    estado: SugestaoEstado = "pendente"
  ): Promise<SugestaoItemEncomendaCliente> {
    const response = await fetch(
      `${SugestaoItemEncomendaController.url}?estado=${estado}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }
    return json;
  }
}

export default SugestaoItemEncomendaController;
