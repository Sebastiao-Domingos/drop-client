import {
  Sugestao,
  // Sugestao,
  SugestaoCriaProdutoResponse,
  SugestaoResponse,
  SugestaoStock,
} from "@/services/sugestaoProduto";
import { ProdutoData } from "../Produto";
import { isEmptyString } from "@/helpers/functions/isEmptyString";

export type SugestaoToStock = ProdutoData & {
  sugestao_id: string;
};

export type SugestaoCreate = {
  nome: string;
  referencia?: string;
  preco: number;
  descricao: string;
  categoria: string;
  marca: string;
  imagem: FileList;
};

export type SugestaoFiltro = {
  /**
   * Somente funciona se o usuário for o um administrador
   */
  fornecedor_id: string;
  nome: string;
  marca: string;
  categoria: string;
  estado: "pendente" | "aprovado" | "negado";
  currentPage: number;
  peerPage: number;
};

class SugestaoController {
  private static readonly URL = "/api/sugestao";

  /**
   * criarSugestaoFromFornecedor
   */
  public async criarSugestaoFromFornecedor(
    data: SugestaoCreate
  ): Promise<Sugestao> {
    const formData = new FormData();

    Object.entries(data).forEach((entry) => {
      const value = entry[1];

      if (typeof value === "object") {
        formData.append(entry[0], value.item(0)!);
      } else {
        formData.append(entry[0], value.toString());
      }
    });

    const response = await fetch(SugestaoController.URL, {
      method: "POST",
      body: formData,
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error || "Ocorreu um erro ao cadastrar a sugestão!");
    }

    return body;
  }

  /**
   * criarStockWithProduto
   */
  public async criarStockWithProduto(
    data: SugestaoToStock
  ): Promise<SugestaoCriaProdutoResponse> {
    const formData = new FormData();

    Object.entries(data).forEach((entry) => {
      const value = entry[1];

      if (Array.isArray(value)) {
        if (entry[0] === "caracteristicas") {
          formData.append(entry[0], JSON.stringify(value));
        } else {
          value.forEach((value) => {
            if (value instanceof FileList) {
              formData.append(entry[0], value.item(0)!);
            }
          });
        }
      } else if (
        typeof value === "string" ||
        typeof value === "boolean" ||
        typeof value === "number"
      ) {
        formData.append(entry[0], value.toString());
      } else {
        formData.append(entry[0], value.item(0)!);
      }
    });

    const response = await fetch(`${SugestaoController.URL}?criar_produto=1`, {
      method: "PUT",
      body: formData,
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error || "Ocorreu um erro ao cadastrar a sugestão!");
    }

    return body;
  }

  /**
   * negarSugestao
   */
  public async negarSugestao(sugestao_id: string) {
    const response = await fetch(`${SugestaoController.URL}/negar`, {
      method: "PUT",
      body: JSON.stringify({ sugestao_id }),
    });
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error || "Ocorreu um erro ao negar a sugestão!");
    }

    return body;
  }

  /**
   * criarStock
   */
  public async criarStock(
    data: SugestaoStock
  ): Promise<SugestaoCriaProdutoResponse> {
    const response = await fetch(`${SugestaoController.URL}?criar_produto=0`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error || "Ocorreu um erro ao cadastrar a sugestão!");
    }

    return body;
  }

  public async obter(data: Partial<SugestaoFiltro>): Promise<SugestaoResponse> {
    const params = new URLSearchParams();

    Object.entries(data).forEach((entry) => {
      params.append(entry[0], entry[1].toString());
    });

    const reponse = await fetch(
      `${SugestaoController.URL}?${params.toString()}`
    );
    const json = await reponse.json();

    if (!reponse.ok) {
      throw new Error(
        json.error || "Ocorreu um erro ao carregar as sugestões!"
      );
    }

    return json;
  }

  public async obterAdministrador(
    data: Partial<SugestaoFiltro>
  ): Promise<SugestaoResponse> {
    const params = new URLSearchParams();

    Object.entries(data).forEach((entry) => {
      console.log(!isEmptyString(entry[1]));

      if (!isEmptyString(entry[1].toString()))
        params.append(entry[0], entry[1].toString());
    });

    const reponse = await fetch(
      `${SugestaoController.URL}?${params.toString()}${
        params.size !== 0 ? "&admin" : "admin"
      }`
    );
    const json = await reponse.json();

    if (!reponse.ok) {
      throw new Error(
        json.error || "Ocorreu um erro ao carregar as sugestões!"
      );
    }

    return json;
  }
}

export default SugestaoController;
