import { api } from '@/infra/api';
import { ProvinciaData } from './Provincias';

export type MunicipioData = {
  nome: string;
  provincia_id: string;
  id?: string;
  provincia?: ProvinciaData;
};

class MunicipioService {
  private readonly BASE_PATH = '/municipio';

  public async getAll(provincia_id: string) {
    const response = await api
      .get<
        {},
        {
          data: MunicipioData[];
        }
      >(`${this.BASE_PATH}/provincia/${provincia_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default MunicipioService;
