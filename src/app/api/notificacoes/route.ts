import NotificacaoService, { NotificationData } from "@/services/notificacoes";

import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const service = new NotificacaoService();

async function POST(request: NextRequest) {
  const data: NotificationData = await request.json();
  try {
    const res = await service.create(data);

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
  const id: string = await request.nextUrl.searchParams.get("id")!;

  try {
    const res = await service.update(id);
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
async function DELETE(request: NextRequest) {
  const id: string = request.nextUrl.searchParams.get("id")!;

  try {
    const res = await service.delete(id);

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
export { POST, DELETE, PUT };
