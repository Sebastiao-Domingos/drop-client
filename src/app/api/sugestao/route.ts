import { isEmptyString } from "@/helpers/functions/isEmptyString";
import SugestaoProdutoService, {
  SugestaoStock,
} from "@/services/sugestaoProduto";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function cadastrar(request: NextRequest) {
  const formData = await request.formData();

  try {
    const service = new SugestaoProdutoService();
    const res = await service.createSugestaoFromFornecedor(formData);

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
      { error: "Erro desconhecido", status: 500 },
      { status: 500 }
    );
  }
}

async function validarSugestaoByAdmin(request: NextRequest) {
  const criarProduto = request.nextUrl.searchParams.get("criar_produto");

  if (
    isEmptyString(criarProduto) ||
    (criarProduto !== "1" && criarProduto !== "0")
  ) {
    return NextResponse.json(
      {
        error: "Por favor selecione uma opção de cadastro de stock",
        status: 400,
      },
      { status: 400 }
    );
  }

  try {
    const service = new SugestaoProdutoService();

    let res;
    if (criarProduto === "1") {
      const formData = await request.formData();
      const sugestao_id = formData.get("sugestao_id");

      if (isEmptyString(sugestao_id?.toString())) {
        return NextResponse.json(
          {
            error: "Por favor selecione uma sugestão a criar o stock",
            status: 400,
          },
          { status: 400 }
        );
      }

      res = await service.createProdutoWithStock(
        sugestao_id?.toString()!,
        formData
      );
    } else {
      const data: SugestaoStock = await request.json();

      if (isEmptyString(data.produto_id) || isEmptyString(data.sugestao_id)) {
        return NextResponse.json(
          {
            error: "Por favor selecione o produto e a sugestão a criar stock",
            status: 400,
          },
          { status: 400 }
        );
      }
      res = await service.createStock(data);
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
      { error: "Erro desconhecido", status: 500 },
      { status: 500 }
    );
  }
}

async function pesquisar(request: NextRequest) {
  const query = request.nextUrl.searchParams;

  try {
    const service = new SugestaoProdutoService();

    const res = await service.filtro(query);
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
      { error: "Erro desconhecido", status: 500 },
      { status: 500 }
    );
  }
}

export { cadastrar as POST, validarSugestaoByAdmin as PUT, pesquisar as GET };
