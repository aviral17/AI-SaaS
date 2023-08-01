// npm i replicate and add API for the same in .env file
//NOTE: Visit Replicate AI and reffusion api ----> https://replicate.com/riffusion/riffusion/api

// TODO: Inside the API where we get with variable `const option .....`, we have a option called ``" webhooks "`` below that, so that Music will generate in real time and faster than what we are using in this right now, we can additionally use `webhooks` here

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";

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

    let response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    // console.log("Response ====================> ", response);

    return NextResponse.json(response);
  } catch (error: any) {
    // If you are getting status code 429 Error, it means API is not responding, it means OpenAi API not working, as I have consumed it already in my free trail and haven't renewed it again
    console.log(
      "**********************************************************************************************************************************"
    );

    console.log("[VIDEO_ERROR]", error?.message);
    return new NextResponse(error?.message, {
      status: 500,
    });
  }
}
