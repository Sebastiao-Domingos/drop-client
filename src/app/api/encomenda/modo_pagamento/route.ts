import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { errorResponse } from '@/helpers/server/errorResponse';
import ModoPagamentoService from '@/services/encomenda/admin/modo_pagamento';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const service = new ModoPagamentoService();
async function cadastrar(request: NextRequest) {
  const formData = await request.formData();
  // const imagem = formData.get("imagem") || "";
  const nome = formData.get('nome') || '';

  if (isEmptyString(nome)) {
    return NextResponse.json({
      status: 400,
      mensagem: 'Nome não pode estar vazio!',
    });
  }

  try {
    const res = await service.create(formData);

    return NextResponse.json(res, { status: res.status });
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response?.data, {
    //       status: error.response?.status,
    //     });
    //   }
    // }
    return errorResponse(error);
  }
}

async function actualizar(request: NextRequest) {
  const formData = await request.formData();

  if (isEmptyString(formData.get('id'))) {
    return NextResponse.json({
      status: 400,
      mensagem: 'ID não pode estar vazio',
    });
  }

  if (!formData.has('imagem') && !formData.has('nome')) {
    return NextResponse.json({
      status: 400,
      mensagem: 'Nome ou imagem não pode estar vazio',
    });
  }

  try {
    // const entryNome = formData.get("nome");
    // const entryImagem = formData.get("imagem");

    // const nome = entryNome!;
    // const imagem = entryImagem!;
    // const id = formData.get("id") || "";

    // const body: ModoPagamentoResponse = { id, nome, imagem };

    const res = await service.update(formData);
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
      { error: 'Erro desconhecido', status: 500 },
      { status: 500 }
    );
  }
}

async function apagar(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  if (isEmptyString(id)) {
    return NextResponse.json({
      status: 400,
      mensagem: 'O ID não pode estar vazio',
    });
  }

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
    return NextResponse.json(
      { error: 'Erro desconhecido', status: 500 },
      { status: 500 }
    );
  }
}

async function obter() {
  const res = await service.get();

  return NextResponse.json(res, { status: res.status });
}

export { cadastrar as POST, obter as GET, apagar as DELETE, actualizar as PUT };
