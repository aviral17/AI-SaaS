"use client";

import { Menu } from "lucide-react"; // we have lucide react, as we chosen default during shadcn installation, else for NewYork it would have been Radix
import { Button } from "./ui/button"; // or @/components/ui/button
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

// This Mobile Sidebar causing `HYDRATION` Error, so to fix this: by using Mounted and return null
const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // meaning the rest below code will not be returned
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="md:hidden bg-rose-400 hover:bg-rose-500  transition-all ease-in-out delay-100 duration-200"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
