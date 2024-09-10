import { errorResponse } from "@/helpers/server/errorResponse";
import PaymentService, { PaymentBody } from "@/services/users/pagamento";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const service = new PaymentService();
  const data: PaymentBody = await request.json();
  try {
    const response = await service.efectuarPagamento(data);
    const paymentResponse = response.response;

    return NextResponse.json({ paymentResponse });
  } catch (e: any) {
    return errorResponse(e);
  }
}

export { POST };
