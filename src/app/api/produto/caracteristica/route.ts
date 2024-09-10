import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { CaracteristicaModel } from "@/services/products/Caracteristica";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const caracteristica: CaracteristicaModel = await request.json();

  try {
    const productService = new ProductService();
    const res = await productService.caracteristica.create(caracteristica);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(error.response?.data, {
          status: error.response?.status,
        });
      }
    }
    return NextResponse.json(
      { error: "Erro desconhecido", status: 500 },
      { status: 500 }
    );
  }
}

async function actualizar(request: NextRequest) {
  const { id, valor }: { id: string; valor: string } = await request.json();

  try {
    const productService = new ProductService();
    const res = await productService.caracteristica.update(id, valor);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(error.response?.data, {
          status: error.response?.status,
        });
      }
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

async function apagar(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  if (isEmptyString(id)) {
    return NextResponse.json({
      status: 400,
      error: "O ID não pode estar vazio",
    });
  }

  try {
    const productService = new ProductService();
    const res = await productService.caracteristica.delete(id);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(error.response?.data, {
          status: error.response?.status,
        });
      }
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

export { cadastrar as POST, apagar as DELETE, actualizar as PUT };
