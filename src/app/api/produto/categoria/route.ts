import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { CategoriaModel } from "@/services/products/Categoria";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const { nome, icone }: CategoriaModel = await request.json();

  if (isEmptyString(nome) || isEmptyString(icone)) {
    return NextResponse.json({
      status: 400,
      mensagem: "Nome e icone não podem estar vazios",
    });
  }

  try {
    const productService = new ProductService();
    const res = await productService.categoria.create({ nome, icone });
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
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

async function actualizar(request: NextRequest) {
  const categoria: CategoriaModel & { id: string } = await request.json();

  if (isEmptyString(categoria.id)) {
    return NextResponse.json({
      status: 400,
      mensagem: "ID não pode estar vazio",
    });
  }

  if (isEmptyString(categoria.nome) && isEmptyString(categoria.icone)) {
    return NextResponse.json({
      status: 400,
      mensagem: "Nome e icone não podem estar vazios",
    });
  }

  try {
    const productService = new ProductService();

    const res = await productService.categoria.update(categoria.id, categoria);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
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
      mensagem: "O ID não pode estar vazio",
    });
  }

  try {
    const productService = new ProductService();
    const res = await productService.categoria.delete(id);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    logger.info(error);
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
  const res = await productService.categoria.getAll();

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
