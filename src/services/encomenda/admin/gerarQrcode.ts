import { api } from '@/infra/api';

export type QrcodeData = {
  id: string;
  codigo_encomenda: string;
  randon_code: string;
  created_at: Date;
  updated_at: Date;
};

class GerarQrcodeService {
  /**
   * gerar
   */
  public async gerar(encomenda_id: string) {
    const response = await api
      .post<{}, { data: QrcodeData }>(`/qrcode/${encomenda_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default GerarQrcodeService;
