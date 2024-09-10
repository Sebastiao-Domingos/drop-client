import NotificacaoService, { NotificationData,} from "@/services/notificacoes";

import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


const service = new NotificacaoService();

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const res = await service.getFornecedor(params.toString());
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

async function PUT(request: NextRequest) {
  const id : string =  request.nextUrl.searchParams.get("id")!;

  try {
    const res = await service.updateAllFornecedor(id);
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

export { GET , PUT };
