import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { errorResponse } from "@/helpers/server/errorResponse";
import CartService, { CartData } from "@/services/cart";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function adicionar(request: NextRequest) {
  let datas: CartData[] = await request.json();

  if (datas.length === 0) {
    throw new Error("Precisa adicionar pelo menos um produto");
  }

  try {
    const cartService = new CartService();
    const body = await cartService.add(datas);
    return NextResponse.json(body.response, { status: 200 });
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   return NextResponse.json(error.response?.data, {
    //     status: error.response?.status || 500,
    //   });
    // }

    return errorResponse(error);
  }
}

async function limpar(request: NextRequest) {
  const { item_id }: { item_id: string } = await request.json();

  try {
    const cartService = new CartService();
    let body;

    if (isEmptyString(item_id)) {
      body = await cartService.limpar();
    } else {
      body = await cartService.removeItem(item_id);
    }
    return NextResponse.json(body.response, { status: 200 });
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   return NextResponse.json(error.response?.data, {
    //     status: error.response?.status || 500,
    //   });
    // }
    return errorResponse(error);
  }
}

async function alterarQuantidade(request: NextRequest) {
  const { quantidade, item_id }: { quantidade: number; item_id: string } =
    await request.json();

  if (isEmptyString(item_id)) {
    throw new Error("Item inválido");
  }

  const quantidadeToValidoNumber = Number(quantidade);

  if (isNaN(quantidadeToValidoNumber) || quantidadeToValidoNumber <= 0) {
    throw new Error("Quantidade inválida");
  }

  try {
    const cartService = new CartService();
    const body = await cartService.changeQuantity(
      item_id,
      quantidadeToValidoNumber
    );
    return NextResponse.json(body.response, { status: 200 });
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   return NextResponse.json(error.response?.data, {
    //     status: error.response?.status || 500,
    //   });
    // }
    return errorResponse(error);
  }
}

async function carrinho() {
  const cartService = new CartService();
  try {
    const body = await cartService.cart();
    return NextResponse.json(body.response, { status: 200 });
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   return NextResponse.json(error.response?.data, {
    //     status: error.response?.status || 500,
    //   });
    // }

    return errorResponse(error);
  }
}

export {
  adicionar as POST,
  limpar as DELETE,
  alterarQuantidade as PUT,
  carrinho as GET,
};
