import { isEmptyString } from "@/helpers/functions/isEmptyString";
import ProductService from "@/services/products";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function adicionarImagem(request: NextRequest) {
  const formData = await request.formData();
  const produto_id = formData.get("produto_id")?.toString();

  if (isEmptyString(produto_id)) {
    return NextResponse.json({
      status: 400,
      mensagem: "Deve selecionar um produto!",
    });
  }

  formData.delete("produto_id");

  try {
    const productService = new ProductService();

    const res = await productService.imagem.addImagemProduto(
      produto_id!,
      formData
    );
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

async function apagar(request: NextRequest) {
  const { imagem_id }: { imagem_id: string } = await request.json();

  if (isEmptyString(imagem_id)) {
    return NextResponse.json({
      status: 400,
      mensagem: "O ID não pode estar vazio",
    });
  }

  try {
    const productService = new ProductService();
    const res = await productService.imagem.delete(imagem_id);
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

export { adicionarImagem as POST, apagar as DELETE };
