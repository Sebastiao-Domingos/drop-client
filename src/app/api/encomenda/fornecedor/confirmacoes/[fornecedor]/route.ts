import { errorResponse } from '@/helpers/server/errorResponse';
import ConfirmacaoFornecidorService from '@/services/fornecedor/Confirmacao_Fornecedor';
import { NextRequest, NextResponse } from 'next/server';

async function obterConfirmacoes(
  request: NextRequest,
  { params }: { params: { fornecedor: string } }
) {
  const param: URLSearchParams = request.nextUrl.searchParams;

  try {
    const service = new ConfirmacaoFornecidorService();
    const res = await service.getConfirmacoesDoFornecedor(
      params.fornecedor,
      param
    );

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { obterConfirmacoes as GET };
