import { isEmptyString } from "@/helpers/functions/isEmptyString";
import {
  NotificationData,
  NotificationDataResponse,
  SearchNotificationParms,
} from "@/services/notificacoes";

export type SearchStockFilter = {
  nome: string;
  id_stock: string;
  fornecedor_id: string;
  currentPage: number;
  peerPage: number;
  created_at: Date;
};
export type SearchStockFornecedor = {
  currentPage: number;
  peerPage: number;
};

class NotificacaoController {
  private static readonly URL = "/api/notificacoes";
  /**
   * criar
   */
  public async criar(data: NotificationData) {
    const response = await fetch(NotificacaoController.URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(
        body.error || "Ocorreu um erro ao cadastrar o notificação!"
      );
    }

    return body;
  }

  public async obterPeloAdministrador(
    notificao: Partial<SearchNotificationParms>
  ): Promise<NotificationDataResponse> {
    const params = new URLSearchParams();

    Object.entries(notificao).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const reponse = await fetch(
      `${NotificacaoController.URL}/administrador?${params.toString()}`
    );

    const json = await reponse.json();

    if (!reponse.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  public async obterPeloFornecedor(
    notificacao: Partial<SearchNotificationParms>
  ): Promise<NotificationDataResponse> {
    const params = new URLSearchParams();

    Object.entries(notificacao).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const reponse = await fetch(
      `${NotificacaoController.URL}/fornecedor?${params.toString()}`
    );

    const json = await reponse.json();
    if (!reponse.ok) {
      throw new Error(json.error);
    }
    return json;
  }

  /**
   * apagar
   */
  public async apagar(notificacao_id: string) {
    if (isEmptyString(notificacao_id)) {
      return {
        error: true,
        body: {
          message: "O id da notificação não pode ser vazio",
        },
      };
    }

    const body = await fetch(
      `${NotificacaoController.URL}?id=${notificacao_id}`,
      {
        method: "DELETE",
      }
    );

    return body.json;
  }

  /**
   * atualizar
   */
  public async actualizar(notificacao_id: string) {
    if (isEmptyString(notificacao_id)) {
      return {
        error: true,
        body: {
          response: {
            message: "O id não podem estar vazio",
          },
        },
      };
    }

    const body = await fetch(
      `${NotificacaoController.URL}?id=${notificacao_id}`,
      {
        method: "PUT",
      }
    );

    const jsonData = await body.json();

    if (!body.ok) {
      throw new Error(jsonData.error);
    }

    return jsonData;
  }

  public async marcaTodasLidasAdmin() {
    const body = await fetch(`/api/notificacoes/administrador`, {
      method: "PUT",
    });

    const jsonData = await body.json();

    if (!body.ok) {
      throw new Error(jsonData.error);
    }

    return jsonData;
  }

  public async marcaTodasLidasFornecedor() {
    const body = await fetch(`${NotificacaoController.URL}/fornecedor`, {
      method: "PUT",
    });

    const jsonData = await body.json();

    if (!body.ok) {
      throw new Error(jsonData.error);
    }

    return jsonData;
  }
}

export default NotificacaoController;
