// import { UserButton } from "@clerk/nextjs";
// npx shadcn-ui@latest add card
"use client";

// import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "../../../../public/constants";

import Image from "next/image";
import arrow from "../../../../public/arrow-right.svg";
import arrow1 from "../../../../public/arrow-right1.svg";

import { useTheme as useNextTheme } from "next-themes";

const DashboardPage = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const { theme } = useNextTheme();

  useEffect(() => {
    if (!mounted) {
      return;
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (!mounted) {
  //     return;
  //   }

  //   if (theme === "dark") {
  //     document.body.style.backgroundImage = 'url("/bg11.jpg")';
  //   } else {
  //     document.body.style.backgroundImage = 'url("/bg31.jpg")';
  //   }
  // }, [theme, mounted]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundImage = 'url("/bg11.jpg")';
    } else {
      document.body.style.backgroundImage = 'url("/bg31.jpg")';
    }
  }, [theme]);

  return (
    <div className="dashboard_main pt-5">
      {/* I want to land at the landing page instead of signin/signup page of Clerk */}
      {/* <UserButton afterSignOutUrl="/" /> */}
      <div className="mb-8 space-y-4 mt-20">
        <h2 className="text-4xl md:text-6xl font-thin text-blue-400 text-center">
          Explore the power of AI
        </h2>
        {/* text-muted-foreground provided by `shadcn` also check globals.css for --muted-foreground */}
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      {/* space-y-4 below div */}
      <div className="px-4 md:px-20 lg:px-32  grid grid-cols-1 xl:grid-cols-2 gap-5">
        {tools.map((tool, index) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            // bg-[#e3e3f5] flex
            className={cn(
              "p-4 dark:border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer group bg-[#CCE3FD] dark:bg-[#02030e36] dashboard_effect w-[100%]  h-60 rounded-2xl dark:ring-1 dark:ring-gray-900 mt-5",
              tool.marginBottom
            )}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-x-4">
              {/* w-fit */}
              <div
                className={cn(
                  "p-2 w-fit rounded-md",
                  tool.bgColor,
                  tool.border
                )}
              >
                {/* <tool.icon className={cn("w-8 h-8", tool.color)} /> */}
                <tool.icon className={cn("w-[100px] h-[100px]", tool.color)} />
              </div>
              <div className="flex flex-col">
                <div className=" text-3xl card_font">{tool.label}</div>
                <p className="max-w-[300px]">{tool.note}</p>
              </div>
            </div>
            <Image
              src={theme === "dark" ? arrow1 : arrow}
              alt="arrow"
              className={`relative w-10 h-10 right-10 group-hover:right-5 transition-all ease-in-out duration-200 delay-200 opacity-70 group-hover:opacity-100`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
