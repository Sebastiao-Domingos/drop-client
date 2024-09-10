import { api } from "@/infra/api";

export type CaracteristicaModel = {
  valor: string;
  produto_id: string;
  atributo_id: string;
};

class Caracterisitica {
  private readonly BASE_PATH = "/caracteristica";

  /**
   * create
   */
  public async create(caracteristica: CaracteristicaModel) {
    const response = await api
      .post<
        {},
        {
          data: CaracteristicaModel & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, caracteristica)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(id: string, valor: string) {
    const response = await api
      .put<
        {},
        {
          data: CaracteristicaModel & {
            id: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${id}`, { valor })
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

export default Caracterisitica;
