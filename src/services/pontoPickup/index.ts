import { api } from "@/infra/api";
import {
  ContatoType,
  EncomendaAllData,
  EnderecoType,
  ValidarEncomendaClienteData,
} from "../estafetas";
import { Endereco, EnderecoData } from "../encomenda/cliente/Endereco";

export type PontoPickup = {
  nome: string;
  disponibilidade: string;
  tempo_envio: string;
  contacto: string;
  municipio_id: string;
  bairro: string;
  rua: string;
  latitude: string;
  longitude: string;
  ponto_referencia: string;
};

export type PontoPickupUpdateData = {
  nome?: string;
  disponibilidade?: string;
  tempo_envio?: string;
  contacto?: string;
};

export type PontoPickupData = {
  id: string;
  nome: string;
  endereco_id: string;
  disponibilidade: string;
  tempo_envio: string;
  contacto: string;
  valido: boolean;
  endereco: {
    id: string;
    bairro: string;
    rua: string;
    municipio_id: string;
    latitude: string;
    longitude: string;
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
  contactos?: ContactoType[];
};

export type ContactoType = {
  id: string;
  conteudo: string;
  tipo_contacto_id: string;
  usuario_id: string;
  tipo_usuario: string;
  created_at: string;
  updated_at: string;
  tipo_contacto: TipoContacto;
};
export interface TipoContacto {
  id: string;
  nome: string;
}

export type EncomendaPickupData = {
  id: string;
  endereco_recolha_id: string;
  encomenda_id: string;
  encomenda: EncomendaAllData;
  entregue: true;
};

export type SearchPickupEncomdaParams = {
  entregue: number | string;
  estado_encomenda: string;
  currentPage: number;
  peerPager: number;
};

export type EncomendaPickupResponse = {
  recolha_encomenda: EncomendaPickupData;
  lastPage: number;
  nextPage: number;
  peerPage: number;
  prevPage: number;
  total: number;
  currentPage: number;
};

export type ReceberEnceomdaData = {
  recolha_encomenda_id: string;
  randon_code: string;
};

export type AgentePickUpData = {
  tipo_usuario: string;
  usuario: {
    nome: string;
    disponibilidade: string;
    tempo_envio: string;
    endereco_id: string;
    valido: boolean;
    created_at: Date;
    updated_at: Date;
    endereco: EnderecoType;
  };
  contactos: ContatoType[];
};

export interface PontoPickupDataEndereco {
  endereco_recolha: EnderecoRecolha;
  contactos: Contacto[];
}

export interface EnderecoRecolha {
  id: string;
  nome: string;
  disponibilidade: string;
  tempo_envio: string;
  endereco_id: string;
  valido: boolean;
  created_at: string;
  updated_at: string;
  endereco: Endereco;
}

export interface Contacto {
  id: string;
  conteudo: string;
  tipo_contacto_id: string;
  usuario_id: string;
  tipo_usuario: string;
  created_at: string;
  updated_at: string;
  tipo_contacto: TipoContacto;
}

export interface TipoContacto {
  id: string;
  nome: string;
}

export type PontoPickupFiltro = {
  valido: "1" | "0";
};

class PontoPickupService {
  private readonly BASE_PATH = "/enderecoRecolha";

  /**
   * create
   */
  public async create(data: PontoPickup) {
    const response = await api
      .post<
        {},
        {
          data: PontoPickupData;
        }
      >("/cadastro/pickup", data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * create
   */
  public async update(id: string, data: PontoPickupUpdateData) {
    const response = await api
      .put<
        {},
        {
          data: PontoPickupData;
        }
      >(`${this.BASE_PATH}/${id}`, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAll(filtro: string) {
    const response = await api
      .get<
        {},
        {
          data: PontoPickupData[];
        }
      >(`${this.BASE_PATH}?${filtro}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getById(id: string) {
    const response = await api
      .get<
        {},
        {
          data: PontoPickupDataEndereco;
        }
      >(`${this.BASE_PATH}/${id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getDataUsuario() {
    const response = await api
      .get<{}, { data: AgentePickUpData }>("/usuario/dados")
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async gerarCodigoDaEncomendaParaCliente(encomenda_id: string) {
    const response = await api
      .post<{}, { data: { message: string } }>(
        `${this.BASE_PATH}/encomenda/entrega/${encomenda_id}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async gerarNovoCodigoDaEncomendaParaCliente(encomenda_id: string) {
    const response = await api
      .put<{}, { data: { message: string } }>(
        `${this.BASE_PATH}/encomenda/entrega/gera/novo/${encomenda_id}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async validarCodigoDaEncomendaDoCliente(data: ValidarEncomendaClienteData) {
    const response = await api
      .put<{}, { data: { message: string } }>(
        `${this.BASE_PATH}/encomenda/entrega/validate/${data.encomenda_id}`,
        { randon_code: data.randon_code }
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async receberEncomendaNoEstafeta(data: ReceberEnceomdaData) {
    const response = await api
      .put<{}, { data: { message: string } }>(
        `${this.BASE_PATH}/receber/${data.recolha_encomenda_id}`,
        { randon_code: data.randon_code }
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  async getEncomendasPickup(filtro: string) {
    const response = await api
      .get<{}, { data: EncomendaPickupResponse }>(
        `${this.BASE_PATH}/encomenda?${filtro}`
      )
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
}

export default PontoPickupService;
