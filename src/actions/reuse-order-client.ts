"use server";

import { logger } from "@/Logger";
import CartService, { CartData } from "@/services/cart";
import { isAxiosError } from "axios";

export async function reuseOrderClient(datas: CartData[]) {
  const cartService = new CartService();

  try {
    const res = await cartService.add(datas);

    return res.status;
  } catch (error) {
    if (isAxiosError(error)) {
      logger.error(error.response?.data);
      const data =
        error.response?.data.error ||
        "Ocorreu um erro ao reutilizar dados da encomenda";

      return data;
    }
    return "Ocorreu um erro ao reutilizar dados da encomenda";
  }
}
