import TabaratoService from "@/services/tabarato";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const service = new TabaratoService();

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const res = await service.get(params.toString());
    return NextResponse.json(res.response, { status: res.status });
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


export {GET}