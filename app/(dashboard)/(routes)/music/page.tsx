"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
// npx shadcn-ui@latest add form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";

// npx shadcn-ui@latest add input
import { Input } from "@/components/ui/input";

import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// npx shadcn-ui@latest add avatar
import { BotAvatar } from "@/components/bot-avatar";

import { Empty } from "@/components/ui/empty";

import { Loader } from "@/components/loader";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";
import { useTheme as useNextTheme } from "next-themes";

const MusicPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [music, setMusic] = useState<string>();
  const [errorMessage, setErrorMessage] = useState("");

  const { theme } = useNextTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundImage = 'url("/bg11.jpg")';
    } else {
      document.body.style.backgroundImage = 'url("/bg31.jpg")';
    }
  }, [theme]);

  // prompt is defined in this form variable, and its validation is there in constants.ts in formSchema, so we using it in <FormField name="prompt" />
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values); // values coming from const form and ultimately from ./constants.ts

      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      console.log(error);

      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }

      setErrorMessage(error.response.data);
    } finally {
      router.refresh();
    }
  };

  // Note that we are using Form of shadcn so we are using in the same way as stated in shadcn docs
  return (
    <div className="pt-[100px] pb-10">
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        // bgColor="bg-violet-500/10"
        bgColor="bg-emerald-500/20"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-2
                py-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                bg-[#10295246]
                shadow-md
              "
            >
              {/* bg-[#c2f5de] <form classname=""> */}
              {/* Here, field prop contains the rest of the props like onChange, onBlur, value etc, so getting these rest of the values via {...field} */}
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0 conversation">
                      {/* We used ring-transparent, as we dont want outline of input field as input field is itself in the box, surrounded by box outline, so we dont want another outline inside the box outline */}
                      <Input
                        className="conversation_input border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-4 text-green-500"
                        disabled={isLoading}
                        placeholder="Electric Guitar with melody"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-[#000] hover:bg-[#3b2363] text-white"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {!music && !isLoading && !errorMessage && (
            <Empty label="No Music created." />
          )}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
          {!isLoading && errorMessage && (
            <div
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted shadow-2xl"
              )}
            >
              <BotAvatar />
              <p className="text-sm">
                Error: API Rate Limit Exceeded.
                <span className="text-gray-400/95"> {errorMessage}</span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
