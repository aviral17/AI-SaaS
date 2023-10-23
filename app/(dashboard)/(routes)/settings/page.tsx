"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Settings } from "lucide-react";
import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import axios from "axios";

const SettingsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useNextTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundImage = 'url("/bg11.jpg")';
    } else {
      document.body.style.backgroundImage = 'url("/bg31.jpg")';
    }
  }, [theme]);

  useEffect(() => {
    // Fetch isPro from the API route
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/settings");
        // console.log("Response = ", response.data);
        // setIsPro(JSON.parse(response.data)); // Parse string to boolean here
        setIsPro(response.data.isPro);
      } catch (error) {
        console.error("Error fetching ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!mounted || isLoading) {
    return null;
  }

  // console.log("isPro ===== ", isPro);

  return (
    <div className="pt-[100px] pb-10">
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700 dark:text-blue-500"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "Congrats! 🎉 You are now a PRO user."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
