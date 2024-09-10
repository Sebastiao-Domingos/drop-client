import axios from "axios";
import { NextResponse } from "next/server";

function errorResponse(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status) {
      return NextResponse.json(error.response?.data, {
        status: error.response.status,
      });
    }
  }

  return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
}

export { errorResponse };
