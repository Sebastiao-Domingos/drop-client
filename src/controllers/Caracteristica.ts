import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { CaracteristicaModel } from "@/services/products/Caracteristica";

export type CaracteristicaData = {
  valor: string;
  id: string;
};

class CaracteristicaController {
  private static readonly url = "/api/produto/caracteristica";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: CaracteristicaModel) {
    const response = await fetch(CaracteristicaController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
  /**
   * actulizar
   */
  public async actualizar(data: CaracteristicaData) {
    if (isEmptyString(data.id) || isEmptyString(data.valor)) {
      throw new Error("O id e o valor não podem estar vazios");
    }

    const response = await fetch(CaracteristicaController.url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
  /**
   * apagar
   */
  public async apagar(id: string) {
    if (isEmptyString(id)) {
      throw new Error("Caracterisitca id não pode estar vazia");
    }
    const response = await fetch(CaracteristicaController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export default CaracteristicaController;
