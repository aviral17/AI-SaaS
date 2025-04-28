// updated as per latest changes

"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"; // As this is client component, so we can't use {auth} here, but we can use {useAuth} in both client and server components

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        {/* <div className="relative h-8 w-8 mr-4"> */}
        <div className="relative mt-[-0.75rem] left-0 top-[0.5rem] mr-6">
          {/* <Image fill alt="Logo" src="/logo.png" /> */}
          <Image alt="Logo" src="/logo1.svg" width={100} height={100} />
        </div>
        <h1 className={cn("text-4xl font-bold text-gray-300", font.className)}>
          SaaS
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
