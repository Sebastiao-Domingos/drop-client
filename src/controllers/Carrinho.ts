import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { CartData } from "@/services/cart";

class CarrinhoController {
  private static readonly url = "/api/cliente/carrinho";

  /**
   * carrinho
   */
  public async carrinho() {
    const body = await fetch(CarrinhoController.url);

    if (!body.ok) {
      logger.error(body);
      throw new Error("Ocorreu um erro ao carregar o carrinho");
    }

    const json = await body.json();
    logger.info(json);

    return json.response;
  }

  /**
   * adicionar
   */
  public async adicionar(datas: CartData[]) {
    const body = await fetch(CarrinhoController.url, {
      method: "POST",
      body: JSON.stringify(datas),
    });

    if (datas.length === 0) {
      throw new Error("Precisa adicionar pelo menos um produto");
    }

    if (!body.ok) {
      logger.error(body);
      throw new Error("Ocorreu um erro ao adicionar produto ao carrinho");
    }

    const json = await body.json();
    logger.info(json);

    return json.response;
  }

  /**
   * remover
   */
  public async remover(item_carrinho_id?: string) {
    const body = await fetch(CarrinhoController.url, {
      method: "DELETE",
      body: JSON.stringify({ item_id: item_carrinho_id }),
    });

    if (!body.ok) {
      logger.error(body);
      throw new Error("Ocorreu um erro ao remover items do carrinho");
    }

    const json = await body.json();
    logger.info(json);

    return json.response;
  }

  /**
   * alterarQuantidade
   */
  public async alterarQuantidade(item_carrinho_id: string, quantidade: number) {
    if (isEmptyString(item_carrinho_id)) {
      throw new Error("Item inválido");
    }

    const quantidadeToValidoNumber = Number(quantidade);

    if (isNaN(quantidadeToValidoNumber) || quantidadeToValidoNumber <= 0) {
      throw new Error("Quantidade inválida");
    }

    const body = await fetch(CarrinhoController.url, {
      method: "PUT",
      body: JSON.stringify({ item_id: item_carrinho_id, quantidade }),
    });

    if (!body.ok) {
      logger.error(body);
      throw new Error("Ocorreu actualizar quantidade");
    }

    const json = await body.json();
    logger.info(json);

    return json.response;
  }
}

export default CarrinhoController;
