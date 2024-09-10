import { isEmptyString } from "@/helpers/functions/isEmptyString";
import Produto from "../../@types/Produto";
import { ImagemResponse } from "@/services/products/Imagem";
import { logger } from "@/Logger";

export type ProdutoData = {
  id?: string;
  nome: string;
  referencia: string;
  preco: string;
  sub_produto_id: string;
  descricao: string;
  marca_id: string;
  online?: boolean;
  roupa: 1 | 0;
  imagem_principal: FileList;
  imagens_adicionais: FileList[];
  caracteristicas: Caracteristica[];
  especificacao: Especificacao[];
};

export type GetProdutoResponse = {
  total: number;
  currentPage: number;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
  produtos: Produto[];
};

export type Caracteristica = {
  atributo_id: string;
  valor: string;
};

export type Especificacao = { tamanho: string; cor: string };

export type SearchProdutoFilter = {
  nome: string;
  marca_id: string;
  sub_produto_id: string;
  sub_categoria_id: string;
  categoria_id: string;
  online: 1 | 0;
  referencia: string;
  currentPage: number;
  peerPage: number;
  created_at: Date;
  news?: 1;
};

class ProdutoController {
  private static readonly url = "/api/produto";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: ProdutoData) {
    // if (data.length === 0 || isEmptyString(data.nome)) {
    //   return {
    //     error: true,
    //     body: {
    //       response: {
    //         message: "O nome e a imagem não podem estar vazios",
    //       },
    //     },
    //   };
    // }

    // return {
    //   error: true,
    //   body: { message: "feito", data },
    // };

    // logger.info(data);

    const formData = new FormData();

    Object.entries(data).forEach((entry) => {
      const value = entry[1];

      if (Array.isArray(value)) {
        if (entry[0] !== "imagens_adicionais") {
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

    const body = await fetch(ProdutoController.url, {
      method: "POST",
      body: formData,
    });

    const json = await body.json();
    if (!body.ok) {
      throw new Error(json.error || "Erro ao cadastrar o produto");
    }

    return json.response;
  }

  /**
   * adicionarImagem
   */
  public async adicionarImagem({
    produto_id,
    imagens,
  }: {
    produto_id: string;
    imagens: FileList[];
  }): Promise<ImagemResponse[]> {
    const formData = new FormData();

    imagens.forEach((imagem) => {
      if (imagem.length > 0) {
        formData.append("novas_imagens_produto", imagem.item(0)!);
      }
    });

    formData.append("produto_id", produto_id);

    const response = await fetch(`${ProdutoController.url}/imagem`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Ocorreu uma erro ao adicionar as imagens!"
      );
    }

    return data;
  }

  /**
   * removerImagem
   */
  public async removerImagem(
    imagem_id: string
  ): Promise<{ status: number; message: string }> {
    logger.info(imagem_id);
    const response = await fetch(`${ProdutoController.url}/imagem`, {
      method: "DELETE",
      body: JSON.stringify({ imagem_id }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ocorreu um erro ao remover a imagem!");
    }

    return data;
  }

  /**
   * actulizar
   */
  public async actualizar(data: Partial<ProdutoData>) {
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

    // if (data.imagem.length === 0 && isEmptyString(data.nome)) {
    //   return {
    //     error: true,
    //     body: {
    //       response: {
    //         message: "O nome e a imagem não podem estar vazios",
    //       },
    //     },
    //   };
    // }

    const formData = new FormData();

    Object.entries(data).forEach((entry) => {
      const value = entry[1];

      if (typeof value === "string" || typeof value === "number") {
        formData.append(entry[0], value.toString());
      } else if (typeof value === "boolean") {
        formData.append(entry[0], value ? "1" : "0");
      }
    });

    if (data.imagem_principal && data.imagem_principal.length > 0) {
      formData.append("imagem", data.imagem_principal.item(0)!);
    }

    const body = await fetch(ProdutoController.url, {
      method: "PUT",
      headers: {},
      body: formData,
    });

    const jsonData = await body.json();

    if (!body.ok) {
      throw new Error(jsonData.error);
    }

    return jsonData;
    // try {

    //   return {
    //     error: false,
    //     body,
    //   };
    // } catch (error) {
    //   return {
    //     error: true,
    //     body: error,
    //   };
    // }
  }
  /**
   * apagar
   */
  public async apagar(produto_id: string) {
    if (produto_id.trim().length === 0) {
      return {
        error: true,
        body: { message: "produto_id não pode estar vazio", status: 0 },
      };
    }

    const body = await fetch(ProdutoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: produto_id }),
    });
    const json = await body.json();

    return json;
  }
  /**
   * obter
   */
  public async obter(
    produto: Partial<SearchProdutoFilter>,
    signal?: AbortSignal
  ): Promise<GetProdutoResponse | Produto> {
    const params = new URLSearchParams();

    Object.entries(produto).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const reponse = await fetch(
      `${ProdutoController.url}?${params.toString()}`,
      {
        signal: signal,
      }
    );

    const json = await reponse.json();

    if (!reponse.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default ProdutoController;
