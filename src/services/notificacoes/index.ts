import { api } from '@/infra/api';

export type NotificationData = {
  id: string;
  visto: true;
  acao: string;
  recurso: string;
  recurso_id: string;
  tipo: string;
  administrador_id: string;
  fornecedor_id: string;
  created_at: Date;
  updated_at: Date;
  body?: string;
};

export type NotificationDataResponse = {
  notificacao: NotificationData[];
  total: number;
  totalNaoVisto: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  peerPage: number;
  lastPage: number;
};

export type SearchNotificationParms = {
  peerPage: number;
  currentPage: number;
};

export type ResponseUpdateAllNotifications = {
  message: string;
};

class NotificacaoService {
  private readonly BASE_PATH = '/notificacao';

  /**
   * create
   */
  public async create(data: NotificationData) {
    const response = await api
      .post<
        {},
        {
          data: NotificationData;
        }
      >(this.BASE_PATH, data)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async update(id: string) {
    const response = await api
      .put<
        {},
        {
          data: NotificationData;
        }
      >(`${this.BASE_PATH}/visto/${id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  ///notificacao/marcar/lidas/admin/{administrador_id}
  public async updateAllAdmin() {
    const response = await api
      .put<
        {},
        {
          data: ResponseUpdateAllNotifications;
        }
      >(`${this.BASE_PATH}/marcar/lidas/admin/{administrador_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async updateAllFornecedor(id: string) {
    const response = await api
      .put<
        {},
        {
          data: ResponseUpdateAllNotifications;
        }
      >(`${this.BASE_PATH}/marcar/lidas/fornecedor/{fornecedor_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAdministrador(params: string) {
    const response = await api
      .get<
        {},
        {
          data: NotificationDataResponse;
        }
      >(`${this.BASE_PATH}/administrador?${params}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getFornecedor(params: string) {
    const response = await api
      .get<
        {},
        {
          data: NotificationDataResponse;
        }
      >(`${this.BASE_PATH}/fornecedor?${params}`)
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
        data: any;
      }
    >(`${this.BASE_PATH}/${id}`);

    return {
      status: 200,
    };
  }
}

export default NotificacaoService;
