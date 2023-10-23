import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000; // Day in Milliseconds

export const checkSubscription = async () => {
  const { userId } = auth();

  // console.log("User Id === ", userId);

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  // console.log("User Subscription ==== ", userSubscription);

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  // console.log("isValid ==============> ", isValid);

  return !!isValid; // Boolean
};
