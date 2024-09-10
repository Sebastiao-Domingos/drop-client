import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
// import { SubCategoriaModel } from "@/services/products/SubCategoria";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const formData = await request.formData();

  // if (isEmptyString(nome) || isEmptyString(categoria_id)) {
  //   return NextResponse.json({
  //     status: 400,
  //     mensagem: "Nome e categoria_id não podem estar vazios",
  //   });
  // }

  try {
    const productService = new ProductService();
    const res = await productService.categoria.subCategoria.create(formData);
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

async function actualizar(request: NextRequest) {
  const formData = await request.formData();

  // if (isEmptyString(formData.get("id"))) {
  //   return NextResponse.json({
  //     status: 400,
  //     mensagem: "ID e nome não podem estar vazios",
  //   });
  // }

  try {
    const productService = new ProductService();
    const id = formData.get("id")?.toString();

    logger.info("actualizando", id);
    const res = await productService.categoria.subCategoria.update(
      id!,
      formData
    );
    logger.info(res);
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
    const res = await productService.categoria.subCategoria.delete(id);
    logger.info(res);
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

async function obter(request: NextRequest) {
  const categoria_id = new URLSearchParams(request.url.split("?")[1]).get(
    "categoria_id"
  );

  const productService = new ProductService();

  const res =
    categoria_id !== null
      ? await productService.categoria.subCategoria.getByCategoria(categoria_id)
      : await productService.categoria.subCategoria.getAll();

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
