import { NextResponse } from "next/server";
import { errorResponse } from "@/helpers/server/errorResponse";
import SessionService from "@/services/users/";

async function GET() {
  try {
    const response = await new SessionService().getUserData();

    return NextResponse.json(response.response, { status: 200 });
  } catch (error) {
    return errorResponse(error);
  }
}

export { GET };
