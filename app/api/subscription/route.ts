import { checkSubscription } from "@/lib/subscription";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  const isPro = await checkSubscription();

  return new NextResponse(JSON.stringify({ isPro: isPro }));
}
