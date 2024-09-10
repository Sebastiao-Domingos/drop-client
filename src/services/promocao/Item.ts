import { api } from "@/infra/api";
import { Promocao } from ".";

class ItemPromocaoService {
  private readonly BASE_PATH = "/promocao/item";

  /**
   * adicionar
   */
  public async adicionar(promocao_id: string, data: string[]) {
    const response = await api
      .put<
        {},
        {
          data: Promocao & {
            id: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${promocao_id}`, { itens_promocao: data })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async remover(item_id: string) {
    await api.delete<
      {},
      {
        data: undefined;
      }
    >(`${this.BASE_PATH}/${item_id}`);

    return {
      status: 200,
    };
  }
}

export default ItemPromocaoService;
