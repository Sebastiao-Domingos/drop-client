import { errorResponse } from '@/helpers/server/errorResponse';
import TratamentoService from '@/services/encomenda/tratamento';
import { NextRequest, NextResponse } from 'next/server';

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  try {
    const service = new TratamentoService();
    const res = await service.getTratamnetoAdministrador(params);
    const { response } = res;
    return NextResponse.json(response, { status: res.status });
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   if (error.response?.status) {
    //     return NextResponse.json(error.response?.data, {
    //       status: error.response.status,
    //     });
    //   }
    // }

    return errorResponse(error);
  }
}

export { GET };
