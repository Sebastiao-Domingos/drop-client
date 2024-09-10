import { isEmptyString } from "@/helpers/functions/isEmptyString";

export type CarrosselControllerData = {
  id?: string;
  descricao: string;
  descktop: FileList;
  mobile: FileList;
};

export type CarrosselResponse = {
  id?: string;
  descricao: string;
  desktop: string;
  mobile: string;
};

class CarrossselController {
  private static readonly url = "/api/carrossel";
  /**
   * criar
   */
  public async criar(data: CarrosselControllerData) {
    if (
      data.descktop.length === 0 ||
      isEmptyString(data.descricao) ||
      data.mobile.length === 0
    ) {
      throw new Error("Todos os campos dever estar preenchido");
    }

    const formData = new FormData();
    formData.append("descricao", data.descricao);
    formData.append("descktop", data.descktop.item(0)!);
    formData.append("mobile", data.mobile.item(0)!);

    const body = await fetch(CarrossselController.url, {
      method: "POST",
      body: formData,
    });
    if (!body.ok) {
      throw new Error("Erro ao cadastrar imagem para o carrossel!");
    }
    const json = await body.json();

    return json.response;
  }

  /**
   * apagar
   */
  public async apagar(carrossel_id: string) {
    if (carrossel_id.trim().length === 0) {
      throw new Error("id do carrossel não pode estar vazio");
    }

    const body = await fetch(CarrossselController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: carrossel_id }),
    }); //.then((res) => res.json());
    if (!body.ok) {
      throw new Error("Erro ao apagar marca");
    }

    const json = await body.json();

    return json;
  }
  /**
   * obter
   */
  public async obter(): Promise<CarrosselResponse[]> {
    const body = await fetch(`${CarrossselController.url}`).then((res) =>
      res.json()
    );

    return body.response;
  }
}

export default CarrossselController;
