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

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// npx shadcn-ui@latest add avatar
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";

import { Empty } from "@/components/ui/empty";

import { Loader } from "@/components/loader";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
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
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt, // openai type and values.prompt as per shadcn
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      console.log(error);

      // We already set API Limit Error as 403 inside conversation/route.ts file freeTrial of server component
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

  // After `GENERATE` submit button is clicked, it refreshes all the server components and so, the counter also get updated this eventually updates the counter from layout to Sidebar client side component and shows the new limit of free trial

  // Note that we are using Form of shadcn so we are using in the same way as stated in shadcn docs
  return (
    <div className="pt-[100px] pb-10">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        // bgColor="bg-violet-500/10"
        bgColor="bg-violet-500/20"
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
                        className="conversation_input border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-4 text-black dark:bg-[#d3e4efce]"
                        disabled={isLoading}
                        placeholder="What is the value of PI?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-black hover:bg-[#2f14c8] dark:bg-[#349b9d] dark:hover:bg-[#4a8094]  transition-all delay-50 duration-400 ease-in  light:shadow-md shadow-gray-600"
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
          {messages.length === 0 && !isLoading && !errorMessage && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg shadow-2xl",
                  message.role === "user"
                    ? "bg-white/10 dark:bg-[#21253f3b] border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
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
    </div>
  );
};

export default ConversationPage;
