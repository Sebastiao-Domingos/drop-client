import { errorResponse } from '@/helpers/server/errorResponse';
import ConfirmacaoFornecedorService, {
  ConfirmacaoFornecedorDataCreation,
} from '@/services/fornecedor/Confirmacao_Fornecedor';
import { NextRequest, NextResponse } from 'next/server';

// Remover arquivo
async function POST(request: NextRequest) {
  const data: ConfirmacaoFornecedorDataCreation = await request.json();
  try {
    const service = new ConfirmacaoFornecedorService();
    const res = await service.create(data);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response?.data, {
    //       status: error.response?.status,
    //     });
    //   }
    // }
    return errorResponse(error);
  }
}

export { POST };
