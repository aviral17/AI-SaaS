// Zap is ThunderBolt type ICON
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// npx shadcn-ui@latest add progress
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";

// update it as per latest changes
export const FreeCounter = ({
  isPro = false,
  apiLimitCount = 0,
}: {
  isPro: boolean;
  apiLimitCount: number;
}) => {
  // It wont be rendered on server side, and so this and useEffect is used to save from hydration error
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  // updated it as per latest changes
  let percent = (apiLimitCount / MAX_FREE_COUNTS) * 100;
  let greaterThanFifty = percent > 50;
  const hundred = percent == 100;
  // Applied "premium" variant to Button from ui/button.tsx
  // console.log("PERCENT = ", percent);

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0 rounded-br-[35px]">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            {/* text-api-meter ${greaterThanFifty ? "text-yellow-500" : ""} */}
            <Progress
              className={`h-3 bg-white`}
              // value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              value={percent}
            />
          </div>
          <Button
            onClick={proModal.onOpen}
            variant="premium"
            className="w-full hover:scale-105 transition-all ease-in-out delay-100 duration-500 shadow-xl hover:shadow-gray-900"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
