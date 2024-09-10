import { isEmptyString } from "@/helpers/functions/isEmptyString";
import SugestaoProdutoService from "@/services/sugestaoProduto";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function negarSugestaoByAdmin(request: NextRequest) {
  const { sugestao_id }: { sugestao_id: string } = await request.json();

  if (isEmptyString(sugestao_id)) {
    return NextResponse.json(
      {
        error: "Sugestão não pode estar vazia",
      },
      { status: 400 }
    );
  }

  try {
    const service = new SugestaoProdutoService();

    await service.denySugestaoFromFornecedor(sugestao_id);

    return NextResponse.json({ message: "Sugestão Negada" }, { status: 200 });
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

export { negarSugestaoByAdmin as PUT };
