"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
// import { Spinner } from "react-loading-skeleton";
import ReactLoading from "react-loading";

// npx shadcn-ui@latest add dialog
// never import these components like Dialog or Button, etc from radix, instead import from ui folder
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// npx shadcn-ui@latest add badge
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { tools } from "../public/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url; // As in route.ts, we are sending `url` in NextResponse, so we gonna be redirected to this url
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      // setLoading(false);
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            // disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full shadow-lg shadow-gray-600 dark:shadow-none transition-all ease-in-out duration-300 group"
          >
            {loading ? (
              <ReactLoading
                type={"spin"}
                color={"#ffffff82"}
                height={"5%"}
                width={"5%"}
                className="relative stroke-[#7794cd82] fill-[#ffffff41] bottom-[10px] stroke-0"
              />
            ) : (
              <>
                Upgrade
                <Zap className="w-4 h-4 ml-2 group-active:fill-white group-hover:fill-white transition-all ease-in-out delay-300 duration-500" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
