import { isEmptyString } from "@/helpers/functions/isEmptyString";
import { errorResponse } from "@/helpers/server/errorResponse";
import ExpedirService, {
  Expedir,
} from "@/services/encomenda/tratamento/Expedir";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const data: Expedir = await request.json();

  if (
    isEmptyString(data.tipo) ||
    (data.tipo !== "entrega" && data.tipo !== "recolha")
  ) {
    return NextResponse.json(
      {
        error:
          "Forma de expedição inválida. Expedição pode ser de recolha ou entrega",
      },
      { status: 400 }
    );
  }

  try {
    const service = new ExpedirService();
    const res = await service.expedir(data);

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

export { POST };
