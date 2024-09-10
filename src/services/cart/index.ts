import { api } from "@/infra/api";

export type CartData = {
  produto_id: string;
  quantidade: number;
  cor?: string;
  tamanho?: string;
};

class CartService {
  private readonly BASE_PATH = "/carrinho";

  /**
   * add
   */
  public async add(datas: CartData[]) {
    const response = await api
      .post<
        {},
        {
          data: {
            id: string;
            cliente_id: string;
            produto_id: string;
            quantidade: number;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, datas)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * cart
   */
  public async cart() {
    const response = await api
      .get<{}, { data: {} }>(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * removeItem
   */
  public async removeItem(item_id: string) {
    const response = await api
      .delete<{}, { data: { status: number; message: string } }>(
        `${this.BASE_PATH}/${item_id}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * changeQuantity
   */
  public async changeQuantity(item_id: string, quantity: number) {
    const response = await api
      .put<{}, { data: {} }>(`${this.BASE_PATH}/${item_id}`, {
        quantidade: quantity,
      })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * limpar
   */
  public async limpar() {
    const response = await api
      .delete<{}, { data: { status: number; message: string } }>(
        `${this.BASE_PATH}/limpa`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default CartService;
