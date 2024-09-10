import { api } from "@/infra/api";
import Produto from "../../../@types/Produto";
import Atributo, { AtributoModel } from "./Atributo";
import Categoria from "./Categoria";
import Marca from "./Marca";
import { GetProdutoResponse } from "@/controllers/Produto";
import Caracterisitica from "./Caracteristica";
import Imagem from "./Imagem";

class ProductService {
  private readonly BASE_PATH = "/produto";

  public readonly categoria = new Categoria();
  public readonly atributo = new Atributo();
  public readonly marca = new Marca();
  public readonly caracteristica = new Caracterisitica();
  public readonly imagem = new Imagem();

  public constructor() {}

  /**
   * create
   */
  public async create(produto: FormData) {
    const response = await api
      .post<
        {},
        {
          data: Produto & {
            id: string;
            created_at: Date;
            caracteristicas: {
              id: string;
              valor: string;
              atributo: AtributoModel & { id: string };
            };
          };
        }
      >(this.BASE_PATH, produto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    return {
      status: 201,
      response,
    };
  }

  public async update(id: string, produto: FormData) {
    const response = await api
      .put<
        {},
        {
          data: Produto & {
            id: string;
            created_at: Date;
            caracteristicas: {
              id: string;
              valor: string;
              atributo: AtributoModel & { id: string };
            };
          };
        }
      >(`${this.BASE_PATH}/${id}`, produto, {
        data: produto,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll(params: string) {
    const response = await api
      .get<
        {},
        {
          data: GetProdutoResponse;
        }
      >(`${this.BASE_PATH}/pesquisa?${params}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getNews
   */
  public async getNews(total?: number) {
    const response = await api
      .get<
        {},
        {
          data: Produto[];
        }
      >(`${this.BASE_PATH}/novidades?take=${total || 5}`)
      .then((res) => res.data);

    return {
      status: 200,
      response: {
        produtos: response,
      },
    };
  }

  public async getByReferencia(referencia: string) {
    const response = await api
      .get<
        {},
        {
          data: Produto & {
            id: string;
            created_at: Date;
            caracteristicas: {
              id: string;
              valor: string;
              atributo: AtributoModel & { id: string };
            };
          };
        }
      >(`${this.BASE_PATH}/referencia/${referencia}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * delete
   */
  public async delete(id: string) {
    await api.delete<
      {},
      {
        data: undefined;
      }
    >(`${this.BASE_PATH}/${id}`);

    return {
      status: 200,
    };
  }
}

export default ProductService;
