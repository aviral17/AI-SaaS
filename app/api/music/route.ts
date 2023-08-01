// npm i replicate and add API for the same in .env file
//NOTE: Visit Replicate AI and reffusion api ----> https://replicate.com/riffusion/riffusion/api

// TODO: Inside the API where we get with variable `const option .....`, we have a option called ``" webhooks "`` below that, so that Music will generate in real time and faster than what we are using in this right now, we can additionally use `webhooks` here

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt, // "funky synth solo",
        },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (error: any) {
    // If you are getting status code 429 Error, it means API is not responding, it means OpenAi API not working, as I have consumed it already in my free trail and haven't renewed it again
    console.log(
      "**********************************************************************************************************************************"
    );

    console.log("[MUSIC_ERROR]", error?.message);
    return new NextResponse(error?.message, {
      status: 500,
    });
  }
}
