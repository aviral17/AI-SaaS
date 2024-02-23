import { NextResponse } from "next/server";
import { checkSubscription } from "@/lib/subscription";

export async function GET() {
  try {
    const isPro = await checkSubscription(); // boolean

    // Returning isPro as a JSON response
    // console.log("isPro =========== ", isPro);

    return new NextResponse(JSON.stringify({ isPro }));
  } catch (error) {
    console.error("[ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// localhost:3000/settings 401 unauthorized showing
// check stripe webhooks again
