import { api } from "@/infra/api";

export type MarcaModel = {
  nome: string | FormDataEntryValue;
  imagem: string | FormDataEntryValue;
};

class Marca {
  private readonly BASE_PATH = "/marca";

  /**
   * create
   */
  public async create(marca: MarcaModel) {
    const formData = new FormData();
    formData.append("nome", marca.nome);
    formData.append("imagem", marca.imagem);

    const response = await api
      .post<
        {},
        {
          data: MarcaModel & {
            id: string;
            created_at: Date;
          };
        }
      >(this.BASE_PATH, formData, {
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

  public async update(
    id: string | FormDataEntryValue,
    marca: Partial<MarcaModel>
  ) {
    const formData = new FormData();

    Object.entries(marca).forEach((entry) => {
      if (entry[1]) {
        formData.append(entry[0], entry[1]);
      }
    });

    const response = await api
      .put<
        {},
        {
          data: MarcaModel & {
            id: string;
            created_at: Date;
          };
        }
      >(`${this.BASE_PATH}/${id}`, formData, {
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

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: {
            nome: string;
            imagem: string;
            id: string;
            created_at: Date;
            updated_at: string;
          }[];
        }
      >(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAllBySubproduct(subproducto_id: string) {
    const response = await api
      .get<
        {},
        {
          data: MarcaModel &
            {
              id: string;
              created_at: Date;
            }[];
        }
      >(`${this.BASE_PATH}/subproduto/${subproducto_id}`)
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

export default Marca;
