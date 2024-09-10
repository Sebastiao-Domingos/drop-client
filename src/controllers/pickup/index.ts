import { isEmptyString } from '@/helpers/functions/isEmptyString';
import {
  PontoPickup,
  PontoPickupData,
  PontoPickupFiltro,
  PontoPickupUpdateData,
} from '@/services/pontoPickup';

class PontoPickupController {
  private static readonly url = '/api/ponto_pickup';
  constructor() {}

  /**
   * criar
   */
  public async criar(data: PontoPickup): Promise<PontoPickupData> {
    const body = await fetch(PontoPickupController.url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const json = await body.json();

    if (!body.ok) {
      throw new Error(json.error);
    }

    return json;
  }

  /**
   * atualizar
   */
  public async atualizar(
    data: Partial<PontoPickupUpdateData & { id: string }>
  ): Promise<PontoPickupData> {
    if (isEmptyString(data.id)) {
      throw new Error('O id não pode estar vazio');
    }

    const body = await fetch(`${PontoPickupController.url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    const json = await body.json();
    if (!body.ok) {
      throw new Error(json.error || 'Erro ao atualizar o ponto pick up');
    }

    return json;
  }
  /**
   * apagar
   */
  public async apagar(id: string) {
    if (isEmptyString(id)) {
      throw new Error('O id não pode estar vazio');
    }

    const body = await fetch(PontoPickupController.url, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
    });

    const json = await body.json();
    if (!body.ok) {
      throw new Error(json.error || 'Erro ao eliminar ponot pick up');
    }

    return json;
  }
  /**
   * obter
   */
  public async obter(
    id?: string,
    filtro?: Partial<PontoPickupFiltro>
  ): Promise<PontoPickupData | PontoPickupData[]> {
    if (id) {
      const body = await fetch(`${PontoPickupController.url}?id=${id}`).then(
        (res) => res.json()
      );
      return body.response;
    } else {
      if (filtro) {
        const params = new URLSearchParams();

        Object.entries(filtro!).forEach((entry) => {
          const value = entry[1];
          if (Array.isArray(value)) {
            value.forEach((estado) => {
              params.append(entry[0], estado.toString());
            });
          } else {
            params.append(entry[0], value.toString());
          }
        });
        const body = await fetch(
          `${PontoPickupController.url}?${params.toString()}`
        ).then((res) => res.json());
        return body.response;
      } else {
        const body = await fetch(`${PontoPickupController.url}`).then((res) =>
          res.json()
        );
        return body.response;
      }
    }
  }
}

export default PontoPickupController;
