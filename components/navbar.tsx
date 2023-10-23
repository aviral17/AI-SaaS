// npx shadcn-ui@latest add sheet  ---> For mobile toggle sidebar bar from shadcn

import * as nextjs from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { ModeToggle } from "./next-ui/providers/ThemeSwitch";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  //  backdrop-filter backdrop-blur-md opacity-10 z-10 bg-[#ef2828]
  return (
    <div className="flex items-center p-4 fixed  w-[100vw] sm:w-[50vw] md:w-[100vw]     backdrop-filter backdrop-blur-md z-10 dark:bg-[#15040457] bg-[#cdf5fb81] ">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="w-[122px] sm:w-[150px] flex justify-between ml-[calc(100vw-192px)] sm:ml-[calc(100vw-210px)] md:ml-[calc(100vw-480px)]">
        <ModeToggle />
        {/* style={{ transform: "scale(1.5)" }} z-20 */}
        <div className="flex ml-1 sm:ml-8">
          <div className="transform sm:scale-[1.5]">
            <nextjs.UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
