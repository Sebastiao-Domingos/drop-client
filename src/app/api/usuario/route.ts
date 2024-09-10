import { errorResponse } from '@/helpers/server/errorResponse';
import EstafetaService from '@/services/estafetas';
import { NextResponse } from 'next/server';

async function GET() {
  try {
    const clienteService = new EstafetaService();

    const body = await clienteService.getDataUsuario();
    const { response } = body;
    return NextResponse.json(response);
  } catch (error) {
    return errorResponse(error);
  }
}

export { GET };
