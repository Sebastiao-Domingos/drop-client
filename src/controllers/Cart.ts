import { logger } from "@/Logger";
import Produto from "../../@types/Produto";
import { desconto } from "@/screens/clients/Product/Details/Preco";

type CartResponse = {
  carrinho: {
    produto: Produto;
    quantidade: number;
    id: string;
    cor?: string;
    tamanho?: string;
  }[];
  valor_total: string;
  cliente_id: string;
};

class CartController {
  private static readonly url = "/api/cliente/carrinho";
  private static readonly nome_carrinho = "_carrinho_cliente_nao_logado";

  /**
   * adicionar
   */
  public async adicionar(data: {
    produto: Produto;
    quantidade: number;
    cor?: string;
    tamanho?: string;
  }): Promise<CartResponse> {
    if (isNaN(data.quantidade) || data.quantidade <= 0) {
      throw new Error("Quantidade inválida");
    }

    const response = await fetch(CartController.url, {
      method: "POST",
      body: JSON.stringify([
        {
          produto_id: data.produto.id,
          quantidade: data.quantidade,
          cor: data.cor,
          tamanho: data.tamanho,
        },
      ]),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        logger.info(jsonResponse);

        return CartController.adicionar_nao_logado(data);
      }
      logger.error(jsonResponse);
      throw new Error(jsonResponse.error || "Erro desconhecido");
    }

    return jsonResponse;
  }

  /**
   * adicionar_nao_logado
   */
  private static async adicionar_nao_logado(data: {
    produto: Produto;
    quantidade: number;
    cor?: string;
    tamanho?: string;
  }) {
    const carrinho = localStorage.getItem(CartController.nome_carrinho) || "{}";

    const carrinhoJSON: CartResponse & { date: number } = JSON.parse(carrinho);

    carrinhoJSON.cliente_id = "local";

    if (!carrinhoJSON.carrinho || carrinhoJSON.carrinho.length === 0) {
      carrinhoJSON.carrinho = [];
      carrinhoJSON.date = Date.now();
    }

    if (carrinhoJSON.carrinho.length > 0) {
      let idx = -1;
      const produto = carrinhoJSON.carrinho.filter((value, index) => {
        if (
          value.produto.id !== data.produto.id ||
          value.cor !== data.cor ||
          value.tamanho !== data.tamanho
        )
          return false;
        idx = index;
        return true;
      });

      if (idx !== -1) {
        produto[0].quantidade += data.quantidade;
        carrinhoJSON.carrinho[idx] = produto[0];
      } else {
        carrinhoJSON.carrinho = [
          ...carrinhoJSON.carrinho,
          { ...data, id: Date.now().toString() },
        ];
      }
    } else {
      carrinhoJSON.carrinho = [{ ...data, id: Date.now().toString() }];
    }

    carrinhoJSON.valor_total =
      CartController.get_total_nao_logado(carrinhoJSON).toString();

    localStorage.setItem(
      CartController.nome_carrinho,
      JSON.stringify(carrinhoJSON)
    );

    return carrinhoJSON;
  }

  private static get_total_nao_logado(carrinho: CartResponse) {
    const total = carrinho.carrinho.reduce(
      (prev, currentElement) =>
        prev +
        (currentElement.produto.itens_promocao.length !== 0
          ? Number(
              desconto(
                currentElement.produto.preco,
                currentElement.produto.itens_promocao[0].promocao.desconto,
                currentElement.produto.itens_promocao[0].promocao.percentagem
              )
            )
          : Number(currentElement.produto.preco)) *
          currentElement.quantidade, //currentElement.quantidade * Number(currentElement.produto.preco)
      0
    );
    return total;
  }

  /**
   * remover
   */
  public async remover(item_id: string) {
    const response = await fetch(CartController.url, {
      method: "DELETE",
      body: JSON.stringify({ item_id: item_id }),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        return CartController.remover_nao_logado(item_id);
      }

      throw new Error(JSON.stringify(jsonResponse));
    }
  }

  /**
   * remover
   */
  private static async remover_nao_logado(item_id: string) {
    const carrinho = localStorage.getItem(CartController.nome_carrinho) || "{}";
    const carrinhoJSON: CartResponse = JSON.parse(carrinho);

    if (!carrinhoJSON.carrinho) {
      carrinhoJSON.carrinho = [];
    }

    let idx = -1;

    carrinhoJSON.carrinho.filter((value, index) => {
      if (value.id !== item_id) return false;
      idx = index;
      return true;
    });

    if (idx !== -1) {
      carrinhoJSON.carrinho.splice(Number(idx), 1);
      carrinhoJSON.valor_total =
        CartController.get_total_nao_logado(carrinhoJSON).toString();
      localStorage.setItem(
        CartController.nome_carrinho,
        JSON.stringify(carrinhoJSON)
      );
    }

    return carrinhoJSON;
  }

  /**
   * getCarrinho
   */
  public async getCarrinho() {
    // logger.info("Sincronizando");
    // await this.sync_carrinho_to_database();
    // logger.info("Fim sincronização");

    const response = await fetch(CartController.url, { method: "GET" });

    const jsonResponse: CartResponse = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        return CartController.get_carrinho_nao_logado();
      }

      throw new Error(JSON.stringify(jsonResponse));
    }

    return jsonResponse;
  }

  /**
   * get_carrinho_nao_logado
   */
  private static get_carrinho_nao_logado() {
    const carrinho = localStorage.getItem(CartController.nome_carrinho) || "{}";

    const carrinhoJSON: CartResponse = JSON.parse(carrinho);

    if (!carrinhoJSON.carrinho) {
      carrinhoJSON.carrinho = [];
      carrinhoJSON.cliente_id = "local";
      carrinhoJSON.valor_total = "0";
    }
    return carrinhoJSON;
  }

  /**
   * actualizarQuantidade
   */
  public async actualizarQuantidade(data: { id: string; quantidade: number }) {
    if (isNaN(data.quantidade) || data.quantidade <= 0) {
      throw new Error("Quantidade inválida");
    }

    const response = await fetch(CartController.url, {
      method: "PUT",
      body: JSON.stringify({ item_id: data.id, quantidade: data.quantidade }),
    });

    const jsonResponse = await response.json();
    // console.log(jsonResponse);

    if (!response.ok) {
      if (response.status === 401) {
        logger.info(jsonResponse);
        return CartController.actualizar_quantidade_nao_logado(data);
      }

      throw new Error(JSON.stringify(jsonResponse));
    }

    return jsonResponse;
  }

  private static actualizar_quantidade_nao_logado(data: {
    id: string;
    quantidade: number;
  }) {
    const carrinho = localStorage.getItem(CartController.nome_carrinho) || "{}";
    const carrinhoJSON: CartResponse = JSON.parse(carrinho);

    if (!carrinhoJSON.carrinho) {
      carrinhoJSON.carrinho = [];
    }

    let idx = -1;

    carrinhoJSON.carrinho.filter((value, index) => {
      if (value.id !== data.id) return false;
      idx = index;
      return true;
    });

    if (idx !== -1) {
      carrinhoJSON.carrinho[Number(idx)].quantidade = data.quantidade;
      carrinhoJSON.valor_total =
        CartController.get_total_nao_logado(carrinhoJSON).toString();
      localStorage.setItem(
        CartController.nome_carrinho,
        JSON.stringify(carrinhoJSON)
      );
    }

    return carrinhoJSON;
  }

  /**
   * faturar
   */
  public async faturar() {}

  /**
   * sync_carrinho
   */
  public async sync_carrinho_to_database() {
    const carrinho = localStorage.getItem(CartController.nome_carrinho) || "{}";
    const carrinhoJSON: CartResponse & { date: number } = JSON.parse(carrinho);
    const expirationDate = Date.now() - carrinhoJSON.date;
    const oneDay = 1 * 24 * 60 * 60 * 1000; // dia * horas * minutos * segundos * milissegundos

    if (expirationDate > oneDay) {
      localStorage.setItem(CartController.nome_carrinho, "{}");
    } else if (carrinhoJSON.carrinho && carrinhoJSON.carrinho.length !== 0) {
      const datas: {
        produto_id: string;
        quantidade: number;
        cor?: string;
        tamanho?: string;
      }[] = [];

      carrinhoJSON.carrinho.forEach((data) => {
        datas.push({
          produto_id: data.produto.id,
          quantidade: data.quantidade,
          cor: data.cor,
          tamanho: data.tamanho,
        });
      });

      try {
        const response = await fetch(CartController.url, {
          method: "POST",
          body: JSON.stringify(datas),
        });

        if (response.ok) {
          localStorage.setItem(CartController.nome_carrinho, "{}");
        }
      } catch (error) {
        logger.error(error);
      }
    }
  }
}

export default CartController;
