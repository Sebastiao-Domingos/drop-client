import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const formData = await request.formData();

  try {
    const productService = new ProductService();
    const res = await productService.categoria.subCategoria.subProduto.create(
      formData
    );

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
  const formData = await request.formData();

  if (isEmptyString(formData.get("id"))) {
    return NextResponse.json({
      status: 400,
      mensagem: "ID não pode estar vazio",
    });
  }

  if (
    isEmptyString(formData.get("nome")) &&
    isEmptyString(formData.get("sub_categoria_id")) &&
    isEmptyString(formData.get("descricao"))
  ) {
    return NextResponse.json({
      status: 400,
      mensagem:
        "Nome, sub_categoria_id, imagem e descricao não podem estar vazios",
    });
  }

  try {
    const productService = new ProductService();
    const id = formData.get("id")!.toString();

    const res = await productService.categoria.subCategoria.subProduto.update(
      id,
      formData
    );
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
    const res = await productService.categoria.subCategoria.subProduto.delete(
      id
    );
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

async function obter(request: NextRequest) {
  const sub_categoria_id =
    new URLSearchParams(request.url.split("?")[1]).get("subcategoria_id") || "";

  const productService = new ProductService();

  const res =
    sub_categoria_id !== "undefined" || !isEmptyString(sub_categoria_id)
      ? await productService.categoria.subCategoria.subProduto.getBySubCategoria(
          sub_categoria_id
        )
      : await productService.categoria.subCategoria.subProduto.getAll();

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
