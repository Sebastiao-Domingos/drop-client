import { isEmptyString } from "@/helpers/functions/isEmptyString";
import {
  FiltedData,
  GetStockResponseFornecedor,
  StockDataCreation,
  StockDataEdit,
} from "@/services/products/Stock";

export type SearchStockFilter = {
  nome: string;
  id_stock: string;
  fornecedor_id: string;
  currentPage: number;
  peerPage: number;
  created_at: Date;
};
export type SearchStockFornecedor = {
  currentPage: number;
  peerPage: number;
};

class StockController {
  private static readonly URL = "/api/produto/stock";

  /**
   * criar
   */
  public async criar(data: StockDataCreation[]) {
    const response = await fetch(StockController.URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error || "Ocorreu um erro ao cadastrar o stock!");
    }

    return body;
  }

  public async obter(
    stock: Partial<SearchStockFilter>,
    signal?: AbortSignal
  ): Promise<FiltedData[] | FiltedData> {
    const params = new URLSearchParams();

    Object.entries(stock).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const reponse = await fetch(`${StockController.URL}?${params.toString()}`, {
      signal: signal,
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  public async obterByFornecedor(
    stock: Partial<SearchStockFornecedor>
  ): Promise<GetStockResponseFornecedor> {
    const params = new URLSearchParams();
    Object.entries(stock).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const reponse = await fetch(
      `${StockController.URL}/stock_fornecedor?${params.toString()}`
    );

    const json = await reponse.json();
    if (!reponse.ok) {
      throw new Error(json.error);
    }
    return json;
  }

  /**
   * apagar
   */
  public async apagar(id_stock: string) {
    if (isEmptyString(id_stock)) {
      return {
        error: true,
        body: {
          message: "O id do stock não pode ser vazio",
        },
      };
    }

    const body = await fetch(`${StockController.URL}`, {
      method: "DELETE",
      body: JSON.stringify({ id_stock: id_stock }),
    });

    return body.json;
  }

  /**
   * atualizar
   */
  public async actualizar(data: StockDataEdit) {
    if (isEmptyString(data.id)) {
      return {
        error: true,
        body: {
          response: {
            message: "O id não podem estar vazio",
          },
        },
      };
    }

    const body = await fetch(StockController.URL, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    const jsonData = await body.json();

    if (!body.ok) {
      throw new Error(jsonData.error);
    }

    return jsonData;
  }
}

export default StockController;
