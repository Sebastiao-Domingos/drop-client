import { api } from "@/infra/api";

export type TypeContacto = {
  id?: string;
  nome: string;
};

class TipoContacto {
  private readonly BASE_PATH = "/tipoContacto";

  /**
   * create
   */
  public async create({ nome }: TypeContacto) {
    const response = await api
      .post<
        {},
        {
          data: TypeContacto;
        }
      >(this.BASE_PATH, { nome })
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(id: string, contacto: TypeContacto) {
    const response = await api
      .put<
        {},
        {
          data: TypeContacto;
        }
      >(`${this.BASE_PATH}/${id}`, contacto)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: TypeContacto[];
        }
      >(this.BASE_PATH)
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

export default TipoContacto;
