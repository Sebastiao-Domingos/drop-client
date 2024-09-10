import { api } from "@/infra/api";

export type EspecificacaoModel = {
  id: string;
  tamanho: string;
  cor: string;
  produto_id: string;
};

class Especificacao {
  private readonly BASE_PATH = "/especificacao";

  /**
   * create
   */
  public async create(especificacao: Omit<EspecificacaoModel, "id">) {
    const response = await api
      .post<
        {},
        {
          data: EspecificacaoModel & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, especificacao)
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

export default Especificacao;
