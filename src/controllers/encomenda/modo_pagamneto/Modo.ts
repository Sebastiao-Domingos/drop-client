import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import {
  // ModoPagamentoData,
  ModoPagamentoResponse,
} from "@/services/encomenda/admin/modo_pagamento";

export type ModoData = {
  nome: string;
  imagem: FileList;
  id?: string;
};

class ModoPagamentoController {
  private static readonly url = "/api/encomenda/modo_pagamento";
  /**
   * criar
   */
  public async criar(data: ModoData) {
    if (data.imagem.length === 0 || isEmptyString(data.nome)) {
      throw new Error("O nome e a imagem não podem estar vazios");
    }

    logger.info(data.imagem.item(0));
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("imagem", data.imagem.item(0)!);

    const body = await fetch(ModoPagamentoController.url, {
      method: "POST",
      body: formData,
    });
    if (!body.ok) {
      throw new Error("Erro ao cadastrar modo de pagamento!");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * actulizar
   */
  public async actualizar(data: Partial<ModoData>) {
    if (isEmptyString(data.id)) {
      throw new Error("O id não podem estar vazio");
    }

    const formData = new FormData();

    formData.append("id", data.id!);

    if (!isEmptyString(data.nome)) {
      formData.append("nome", data.nome!);
    }
    if (data.imagem?.length !== 0) {
      formData.append("imagem", data.imagem?.item(0)!);
    }

    const body = await fetch(ModoPagamentoController.url, {
      method: "PUT",
      headers: {},
      body: formData,
    });

    if (!body.ok) {
      throw new Error("Erro ao actualizar o modo de pagamento!");
    }

    const json = await body.json();

    return json.response;
  }
  /**
   * apagar
   */
  public async apagar(modo_id: string) {
    if (modo_id.trim().length === 0) {
      throw new Error("id do  modo de pagamento não pode estar vazio");
    }

    const body = await fetch(ModoPagamentoController.url, {
      method: "DELETE",
      body: JSON.stringify({ id: modo_id }),
    });
    if (!body.ok) {
      throw new Error("Erro ao apagar o modo de pagamento");
    }

    const json = await body.json();

    return json;
  }
  /**
   * obter
   */
  public async obter(): Promise<ModoPagamentoResponse[]> {
    const body = await fetch(ModoPagamentoController.url).then((res) =>
      res.json()
    );

    return body.response;
  }
}

export default ModoPagamentoController;
