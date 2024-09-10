import StockService from "@/services/products/Stock";
import { AxiosError } from "axios";
import { NextResponse, NextRequest } from "next/server";

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const stockService = new StockService();

    const res = await stockService.getByFornecedor(params.toString());
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

export { GET };
