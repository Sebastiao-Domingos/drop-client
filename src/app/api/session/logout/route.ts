import SessionService from "@/services/users/";
import { NextResponse } from "next/server";

async function POST() {
  const sessionService = new SessionService();

  sessionService.cleanToken();
  return NextResponse.json({}, { status: 200 });
}

export { POST };
