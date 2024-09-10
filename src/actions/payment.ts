"use server";

import PagamentoService, { Pagamento } from "@/services/encomenda/pagamento";
import { isAxiosError } from "axios";

export async function paymentAction(
  data: Pagamento & { encomenda_id: string }
) {
  try {
    const paymentService = new PagamentoService();
    const res = await paymentService.pagamento(
      { telefone: data.telefone },
      data.encomenda_id
    );

    return res.status;
  } catch (error) {
    console.log(error);

    if (isAxiosError(error)) {
      const data: string =
        error.response?.data.message || error.response?.data.error;

      return data;
    }

    return "Ocorreu um erro ao fazer o pagamento";
  }
}
