import { errorResponse } from "@/helpers/server/errorResponse";
import SugestaoItemEncomendaService, {
  SugestaoItemEncomendaCreate,
} from "@/services/encomenda/admin/sugestao_produto";
import { NextRequest, NextResponse } from "next/server";

async function create(request: NextRequest) {
  const data: SugestaoItemEncomendaCreate = await request.json();
  try {
    const service = new SugestaoItemEncomendaService();

    const { response, status } = await service.create(data);

    return NextResponse.json(response, { status });
  } catch (error) {
    return errorResponse(error);
  }
}

async function getAll() {
  try {
    const service = new SugestaoItemEncomendaService();

    const { response, status } = await service.getAll();

    return NextResponse.json(response, { status });
  } catch (error) {
    return errorResponse(error);
  }
}

export { create as POST, getAll as GET };
