import { api } from '@/infra/api';
import MunicipioService from './Municipios';
import { PaisData } from '.';

export type ProvinciaData = {
  nome: string;
  pais_id: string;
  id?: string;
  pais?: PaisData;
};

class ProvinciasService {
  private readonly BASE_PATH = '/provincia';
  public readonly municipio = new MunicipioService();

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: ProvinciaData[];
        }
      >(`${this.BASE_PATH}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
  public async getByPaisId(pais_id: string) {
    const response = await api
      .get<
        {},
        {
          data: ProvinciaData[];
        }
      >(`${this.BASE_PATH}/${pais_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
  /**
   * delete
   */
}

export default ProvinciasService;
