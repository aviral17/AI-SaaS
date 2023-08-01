import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

// using this for Stripe as after payment, it need to know where to go, whats gonna be return url, so it needs to be `absolute path`
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // ***** For already subscribed user
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl, // once user finish his billing update/settings, he will be directed to localhost:3000/settings or homepage/settings
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // Its not a billing page, its a checkout page for first time subscribing user unlike the billing page as above for the subscribed user
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"], // we can add other methods also here like Crypto payments
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress, // from clerk
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Genius Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],

      // When the user puschases/subscribes/make payments, We gonna create Web Hooks to know who has taken our Paid services, we want to know about that userId, so that work is handled via metadata,  Without this, we wont be able to know the user/userId and so we will be unable to give them subscription
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
