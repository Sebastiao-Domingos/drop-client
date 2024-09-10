import { isEmptyString } from '@/helpers/functions/isEmptyString';
import { errorResponse } from '@/helpers/server/errorResponse';
import GerarQrcodeService from '@/services/encomenda/admin/gerarQrcode';
import { NextRequest, NextResponse } from 'next/server';

async function POST(request: NextRequest) {
  const { encomenda_id }: { encomenda_id: string } = await request.json();

  if (isEmptyString(encomenda_id)) {
    return NextResponse.json(
      { error: 'encomenda_id não pode estar vazia' },
      { status: 400 }
    );
  }

  try {
    const service = new GerarQrcodeService();
    const res = await service.gerar(encomenda_id);

    return NextResponse.json(res.response, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { POST };
