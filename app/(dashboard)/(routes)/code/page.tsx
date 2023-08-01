"use client";

// npm i react-markdown ---------> To structure/format the code

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

import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// npx shadcn-ui@latest add avatar
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";

import { Empty } from "@/components/ui/empty";

import { Loader } from "@/components/loader";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const CodePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

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

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

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
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        // bgColor="bg-violet-500/10"
        bgColor="bg-green-700/20"
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
                bg-[#0ba04c91]
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
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-4  bg-[#eff6ff]"
                        disabled={isLoading}
                        placeholder="Create Counter app using Next JS"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
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
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
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
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                {/* To structure/format the code, Now we are using components, classname, etc to style the code, highlight words after code, and to align properly the text and code */}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
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

export default CodePage;
