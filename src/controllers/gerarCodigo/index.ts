import { isEmptyString } from "@/helpers/functions/isEmptyString";

class GerarCodigoController {
  public async novoCodigo({
    whatsapp,
  }: {
    whatsapp: string;
  }): Promise<{ message: string }> {
    if (isEmptyString(whatsapp)) {
      throw new Error("O whatsapp não pode estar vazio!");
    }

    const response = await fetch("/api/generate-code", {
      body: JSON.stringify({ whatsapp }),
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  }
}

export default GerarCodigoController;
