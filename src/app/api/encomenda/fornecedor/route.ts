import { errorResponse } from '@/helpers/server/errorResponse';
import ConfirmacaoFornecidorService, {
  ConfirmacaoFornecedorDataUpdate,
} from '@/services/fornecedor/Confirmacao_Fornecedor';
import { NextRequest, NextResponse } from 'next/server';

async function confirmarQuantidade(request: NextRequest) {
  const data: ConfirmacaoFornecedorDataUpdate = await request.json();

  try {
    const service = new ConfirmacaoFornecidorService();
    const res = await service.update(data);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function obterConfirmacoes(request: NextRequest) {
  const params: URLSearchParams = request.nextUrl.searchParams;
  try {
    const service = new ConfirmacaoFornecidorService();
    const res = await service.getAllFornecedorConfirmacao(params);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { confirmarQuantidade as PUT, obterConfirmacoes as GET };
