import { api } from '@/infra/api';
import ProvinciasService from './Provincias';

export type PaisData = { nome: string; id?: string };

class PaisService {
  private readonly BASE_PATH = '/pais';
  public readonly provincias = new ProvinciasService();

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: PaisData[];
        }
      >(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default PaisService;
