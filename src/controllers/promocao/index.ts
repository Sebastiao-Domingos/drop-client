import { Promocao } from "@/services/promocao";

class PromocaoController {
  private static readonly url = "/api/promocao";
  constructor() {}

  /**
   * obterobterPromocoesValidas
   */
  public async obterPromocoesValidas(): Promise<Promocao[]> {
    const body = await fetch(`${PromocaoController.url}?tipo=valida`).then(
      (res) => res.json()
    );

    return body;
  }
}

export default PromocaoController;
