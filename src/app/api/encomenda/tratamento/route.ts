import { errorResponse } from "@/helpers/server/errorResponse";
import TratamentoService, {
  TratamentoDataCreation,
} from "@/services/encomenda/tratamento";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const data: TratamentoDataCreation = await request.json();

  try {
    const service = new TratamentoService();
    const res = await service.tratarEncomenda(data);

    return NextResponse.json(res.response, { status: res.status });
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

async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  try {
    const service = new TratamentoService();
    const res = await service.getTratamneto(params);
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

export { POST, GET };
