import { errorResponse } from "@/helpers/server/errorResponse";
import NewsletterService, { NewsletterCreateData } from "@/services/newsletter";
import { NextRequest, NextResponse } from "next/server";

async function subscribe(request: NextRequest) {
  const params: NewsletterCreateData = await request.json();

  try {
    const newsletter = new NewsletterService();

    const body = await newsletter.subscribe(params);
    const { response } = body;
    return NextResponse.json(response);
  } catch (error) {
    return errorResponse(error);
  }
}

export { subscribe as POST };
