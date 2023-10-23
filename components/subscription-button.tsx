"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading... 😍", {
        position: "top-center",
      });
    } else if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    } else {
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  }, [loading, error]);

  const onClick = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.get("/api/stripe");
      // This one is a smart move, once it visit this route page, if the user is subscribed then its gonna send the user to Billing page else it would send the user to Checkout page, and all these happen Automatically

      window.location.href = response.data.url;
    } catch (error) {
      // toast.error("Something went wrong");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "premium" : "premium"}
      disabled={loading}
      onClick={onClick}
      className="dark:shadow-none shadow-lg shadow-gray-700"
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
