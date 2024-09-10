import { api } from '@/infra/api';

export type PickupData = {
  id?: string;
  nome: string;
  disponibilidade: string;
  tempo_envio: string;
  municipio_id: string;
  bairro: string;
  rua: string;
  ponto_referencia: string;
  latitude: string;
  longitude: string;
  whatsapp: string;
};

export type PickupDataResponseLogin = {
  token: string;
  nome: string;
  email: string;
  telefone: string;
  usuario_id: string;
  tipo_usuario: string;
};

export type Pickup = {
  id?: string;
  nome: string;
  nif: string;
  endereco_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type PickupGetResponse = {
  fornecedor: Pickup[];
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  peerPage: number;
  lastPage: number;
};
export type SearchPickupParams = {
  nome: string;
  currentPage: number;
  peerPage: number;
};

export type DataPickup = {
  fornecedor: {
    id: string;
    nome: string;
    nif: string;
    endereco: {
      id: string;
      bairro: string;
      municipio_id: string;
      rua: string;
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
  contactos: [
    {
      id: string;
      nome: string;
      conteudo: string;
      tipo_contacto_id: string;
      usuario_id: string;
      tipo_usuario: any;
      tipo_contacto: {
        id: string;
        nome: string;
      };
    }
  ];
};

class PickupService {
  private readonly BASE_PATH = '/pickups';

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: PickupData[];
        }
      >(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default PickupService;
