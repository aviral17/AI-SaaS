// update as per latest changes

"use client";

// update as per latest changes
// import Typewriter from "typewriter-effect";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
// import { CircularProgress } from "@nextui-org/progress";

// update as per latest changes
export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Blog Writing.",
                "Mail Writing.",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 10,
              delay: 10,
              // pauseFor: 5000,
              // preStringTyped: (arrayPos: any, self: any) => {
              //   self.el.classList.add("typewriter-blur");
              // },
              // onStringTyped: (arrayPos: any, self: any) => {
              //   self.el.classList.remove("typewriter-blur");
              // },
            }}
          />

          {/* <Typewriter
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Blog Writing.",
                "Mail Writing.",
              ],
              autoStart: true,
              loop: true,
              pauseFor: 5000,
              deleteSpeed: 10,
              delay: 10,
            }}
          /> */}
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};
