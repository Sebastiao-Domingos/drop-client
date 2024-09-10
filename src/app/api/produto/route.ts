import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const formData = await request.formData();

  try {
    const productService = new ProductService();

    const res = await productService.create(formData);
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

  try {
    const productService = new ProductService();
    const id = formData.get("id") || "";
    formData.delete("id");

    const res = await productService.update(id.toString(), formData);
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
    const res = await productService.delete(id);
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
  const params = request.nextUrl.searchParams;

  try {
    const productService = new ProductService();

    let res;

    if (params.get("referencia")) {
      res = await productService.getByReferencia(params.get("referencia")!);
    } else if (params.get("news")) {
      logger.info(params.toString());
      const value = Number(params.get("peerPage"));
      res = await productService.getNews(isNaN(value) ? 5 : value);
    } else {
      res = await productService.getAll(params.toString());
    }

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status) {
        return NextResponse.json(error.response?.data, {
          status: error.response?.status,
        });
      }
    }
    return NextResponse.json(
      { error: "Erro desconhecido", data: error, status: 500 },
      { status: 500 }
    );
  }
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
