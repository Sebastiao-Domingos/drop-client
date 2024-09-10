import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { AtributoModel } from "@/services/products/Atributo";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const { nome }: AtributoModel = await request.json();

  if (isEmptyString(nome)) {
    return NextResponse.json(
      {
        status: 400,
        error: "Nome não pode estar vazio",
      },
      { status: 400 }
    );
  }

  try {
    const productService = new ProductService();
    const res = await productService.atributo.create({ nome });
    logger.info(res);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(
          { error: error.response?.data, status: error.status },
          {
            status: error.response?.status,
          }
        );
      }
    }
    return NextResponse.json(
      { error: "Erro desconhecido", status: 500 },
      { status: 500 }
    );
  }
}

async function actualizar(request: NextRequest) {
  const { nome, id }: AtributoModel & { id: string } = await request.json();

  if (isEmptyString(nome) || isEmptyString(id)) {
    return NextResponse.json({
      status: 400,
      error: "Nome e ID não podem estar vazios",
    });
  }

  try {
    const productService = new ProductService();
    const res = await productService.atributo.update(id, { nome });
    logger.info(res);
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
    const res = await productService.atributo.delete(id);
    logger.info(res);
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

async function obter() {
  const productService = new ProductService();
  const res = await productService.atributo.getAll();
  // logger.info(res);

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
