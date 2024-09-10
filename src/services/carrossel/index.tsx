import { api } from '@/infra/api';

export type CarrosselData = {
  descricao: string | FormDataEntryValue;
  descktop: string | FormDataEntryValue;
  mobile: string | FormDataEntryValue;
};

class CarrosselService {
  private readonly BASE_PATH = '/carrossel';

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: CarrosselData &
            {
              id: string;
              created_at: Date;
            }[];
        }
      >(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default CarrosselService;
