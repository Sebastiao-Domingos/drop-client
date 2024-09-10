"use server";

import PagamentoService from "@/services/encomenda/pagamento";
import { isAxiosError } from "axios";

export async function paymentQrcodeAction(encomenda_id: string) {
  try {
    const paymentService = new PagamentoService();
    const res = await paymentService.pagamentoPorQrcode(encomenda_id);

    return {
      ...res.response,
      emis_url: process.env.EMIS_URL_API!,
    };
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
