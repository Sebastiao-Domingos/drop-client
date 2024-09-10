import { Promocao } from "@/services/promocao";

class ItemPromocaoController {
  private static readonly url = "/api/promocao/admin/item";

  public async adicionar(data: {
    produtos: string[];
    promocao_id: string;
  }): Promise<Promocao> {
    const response = await fetch(
      ItemPromocaoController.url + "?promocao_id=" + data.promocao_id,
      {
        method: "PUT",
        body: JSON.stringify(data.produtos),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  public async remover(item_id: string): Promise<Promocao> {
    const response = await fetch(
      ItemPromocaoController.url + "?item_id=" + item_id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default ItemPromocaoController;
