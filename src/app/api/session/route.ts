import { SessionData } from "@/controllers/Session";
import { errorResponse } from "@/helpers/server/errorResponse";
import SessionService from "@/services/users/";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const sessionService = new SessionService();

  const data: SessionData = await request.json();

  try {
    const response = await sessionService.session(data);
    const user = response.response;
    return NextResponse.json({ user });
  } catch (error: any) {
    return errorResponse(error);
  }
}

export { POST };
