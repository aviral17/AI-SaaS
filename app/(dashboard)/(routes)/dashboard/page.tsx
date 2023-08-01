// import { UserButton } from "@clerk/nextjs";
// npx shadcn-ui@latest add card
"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "../../../../public/constants";

const DashboardPage = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<any>(null);

  return (
    <div className="dashboard_main">
      {/* I want to land at the landing page instead of signin/signup page of Clerk */}
      {/* <UserButton afterSignOutUrl="/" /> */}
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        {/* text-muted-foreground provided by `shadcn` also check globals.css for --muted-foreground */}
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool, index) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            // bg-[#e3e3f5]
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer group bg-[#e3e3f5]"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            {/* <ArrowRight
              className={`relative w-5 h-5 right-10 group-hover:right-2 group-hover:text-blue-500 group-hover:w-10 group-hover:h-10  transition-all ease-in duration-200 delay-100`}
            /> */}
            {/* {hoveredCard === index ? (
              <ArrowRight
                className={`relative w-5 h-5 right-10 opacity-40 text-gray-700 group-hover:right-2 group-hover:text-rose-500  group-hover:w-10 group-hover:h-7 group-hover:opacity-100  transition-all ease-in duration-200 delay-100`}
              />
            ) : (
              <span className="font-light text-gray-400 relative right-10 transition-all ease-in-out duration-200 delay-200 text-2xl">{`>`}</span>
            )} */}
            <div
              className={`relative right-10 transition-all ease-in-out duration-200 delay-200`}
            >
              {hoveredCard === index ? (
                <ArrowRight
                  className={`w-5 h-5 text-blue-500 right-2 transition-all ease-in-out duration-200 delay-200 ${
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  } `}
                />
              ) : (
                <span
                  className={`relative font-light text-gray-400 text-2xl right-10 transition-all ease-in-out duration-200 delay-200 ${
                    hoveredCard === index ? "opacity-0" : "opacity-100"
                  } `}
                >{`>`}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
