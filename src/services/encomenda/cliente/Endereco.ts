import { api } from "@/infra/api";
import { MunicipioData } from "@/services/pais/Municipios";

export type Endereco = {
  municipio_id: string;
  descricao: string;
  bairro: string;
  rua: string;
  latitude: string;
  longitude: string;
  ponto_referencia: string;
  municipio?: MunicipioData;
};

export type EnderecoData = {
  id: string;
  cliente_id: string;
  endereco_id: string;
  descricao: string;
  predefinido: boolean;
  endereco: {
    id: string;
    bairro: string;
    rua: string;
    municipio_id: string;
    ponto_referencia: string;
    municipio: {
      id: string;
      nome: string;
      provincia_id: string;
      provincia: {
        id: string;
        nome: string;
      };
    };
  };
};

export type EnderecoDataUpdate = {
  id: string;
  municipio_id: string;
  bairro: string;
  ponto_referencia: string;
  rua: string;
  latitude: string;
  longitude: string;
};
class EnderecoService {
  private readonly BASE_PATH = "/enderecoEntrega";

  /**
   * create
   */
  public async create(data: Endereco) {
    const response = await api
      .post<
        {},
        {
          data: EnderecoData;
        }
      >(this.BASE_PATH, data)
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
          data: EnderecoData[];
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
    const response = await api
      .delete<
        {},
        {
          data: { message: string };
        }
      >(`${this.BASE_PATH}/${id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(data: Partial<EnderecoDataUpdate>) {
    const { id: _, ...newData } = data;
    const response = await api
      .put<
        {},
        {
          data: EnderecoData;
        }
      >(`/endereco/${data.id}`, newData)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default EnderecoService;
