import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { CreatePromocao, Promocao, UpdatePromocao } from "@/services/promocao";
import PromocaoController from "..";

class PromocaoAdminController extends PromocaoController {
  private static readonly urlAdmin = "/api/promocao/admin";
  private static readonly urlGeral = "/api/promocao";

  /**
   * criar
   */
  public async criar(data: CreatePromocao): Promise<Promocao> {
    const response = await fetch(PromocaoAdminController.urlAdmin, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  /**
   * actulizar
   */
  public async actualizar(data: Partial<UpdatePromocao>): Promise<Promocao> {
    const body = await fetch(PromocaoAdminController.urlAdmin, {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((res) => res.json());

    return body.response;
  }

  /**
   * apagar
   */
  public async apagar(promocao: string) {
    if (isEmptyString(promocao)) {
      throw new Error("Promoção não pode estar vazia");
    }

    const response = await fetch(PromocaoAdminController.urlAdmin, {
      method: "DELETE",
      body: JSON.stringify({ id: promocao }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error || "Erro ao apagar promoção");
    }
    return json;
  }

  /**
   * obterobterPromocao
   */
  public async obterPromocao(id: string): Promise<Promocao> {
    const body = await fetch(
      `${PromocaoAdminController.urlGeral}?tipo=detalhe&promocao=${id}`
    ).then((res) => res.json());

    return body;
  }

  /**
   * obterobterPromocoes
   */
  public async obterPromocoes(): Promise<Promocao[]> {
    const body = await fetch(
      `${PromocaoAdminController.urlGeral}?tipo=all`
    ).then((res) => res.json());

    return body;
  }

  /**
   * promocoes
   */
  public async promocoes(tipo: "validas" | "todas") {
    if (tipo === "todas") {
      return await this.obterPromocoes();
    }

    return await this.obterPromocoesValidas();
  }
}

export default PromocaoAdminController;
