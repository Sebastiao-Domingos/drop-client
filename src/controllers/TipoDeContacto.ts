import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { TypeContacto } from "@/services/TipoContacto";

class TipoContactoController {
  private static readonly url = "/api/tipo-de-contacto";
  constructor() {}

  /**
   * criar
   */
  public async criar(data: TypeContacto): Promise<TypeContacto> {
    const response = await fetch(TipoContactoController.url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error);
    }

    return body;
  }
  /**
   * actulizar
   */
  public async actualizar(data: TypeContacto): Promise<TypeContacto> {
    if (isEmptyString(data.id) || isEmptyString(data.nome)) {
      throw new Error("O id e o nome não pode estar vazio");
    }

    const response = await fetch(TipoContactoController.url, {
      method: "PUT",
      headers: {},
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.error);
    }

    return body;
  }
  /**
   * apagar
   */
  public async apagar(contacto_id: string) {
    if (isEmptyString(contacto_id)) {
      throw new Error("Tipo de contacto id não pode estar vazio");
    }

    const response = await fetch(TipoContactoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: contacto_id }),
    });
    const body = await response.json();

    if (!response.ok) throw new Error(body.error);

    return body;
  }
  /**
   * obter
   */
  public async obter(): Promise<TypeContacto[]> {
    const body = await fetch(TipoContactoController.url).then((res) =>
      res.json()
    );

    return body;
  }
}

export default TipoContactoController;
