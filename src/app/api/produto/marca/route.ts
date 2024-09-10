import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { MarcaModel } from "@/services/products/Marca";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const formData = await request.formData();
  const imagem = formData.get("imagem") || "";
  const nome = formData.get("nome") || "";

  if (isEmptyString(nome)) {
    return NextResponse.json({
      status: 400,
      mensagem: "Nome não pode estar vazio",
    });
  }

  try {
    const productService = new ProductService();

    const res = await productService.marca.create({ nome, imagem });
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
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
  const formData = await request.formData();

  if (isEmptyString(formData.get("id"))) {
    return NextResponse.json({
      status: 400,
      mensagem: "ID não pode estar vazio",
    });
  }

  if (!formData.has("imagem") && !formData.has("nome")) {
    return NextResponse.json({
      status: 400,
      mensagem: "Nome ou imagem não pode estar vazio",
    });
  }

  try {
    const productService = new ProductService();

    const entryNome = formData.get("nome");
    const entryImagem = formData.get("imagem");

    const nome = entryNome === null ? undefined : entryNome;
    const imagem = entryImagem === null ? undefined : entryImagem;

    const body: Partial<MarcaModel> = { nome, imagem };
    const id = formData.get("id") || "";

    const res = await productService.marca.update(id, body);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
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
    const res = await productService.marca.delete(id);
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
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

async function obter(request: NextRequest) {
  const subproduto = request.nextUrl.searchParams.get("subproduto");

  try {
    const productService = new ProductService();
    let res;
    if (isEmptyString(subproduto)) {
      res = await productService.marca.getAll();
    } else {
      res = await productService.marca.getAllBySubproduct(subproduto!);
    }
    return NextResponse.json(res, { status: res.status });
  } catch (error) {
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

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
