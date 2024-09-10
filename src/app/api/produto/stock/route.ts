import { logger } from "@/Logger";
import { isEmptyString } from "@/helpers/functions/isEmptyString";
import StockService, {
  StockDataCreation,
  StockDataEdit,
} from "@/services/products/Stock";
import { Axios, AxiosError, isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const data: StockDataCreation[] = await request.json();
  console.log(data);

  try {
    const service = new StockService();
    const response = await service.create(data);
    return NextResponse.json(response, { status: response.status });
  } catch (error) {
    console.log(error);

    if (isAxiosError(error)) {
      if (error.response?.status) {
        return NextResponse.json(error.response.data, {
          status: error.response.status,
        });
      }
    }

    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}

async function obter(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const stockService = new StockService();
    let res;

    if (params.get("id_stock")) {
      res = await stockService.getById(params.get("id_stock")!);
    } else {
      res = await stockService.getAll(params.toString());
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

async function actualizar(request: NextRequest) {
  const data: StockDataEdit = await request.json();

  try {
    const stockService = new StockService();

    const res = await stockService.update(data);
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
  const { id_stock }: { id_stock: string } = await request.json();

  if (isEmptyString(id_stock)) {
    return NextResponse.json({
      status: 400,
      mensagem: "O ID não pode estar vazio",
    });
  }

  try {
    const productService = new StockService();
    const res = await productService.delete(id_stock);
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
