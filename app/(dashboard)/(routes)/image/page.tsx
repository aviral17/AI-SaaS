"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { toast } from "react-hot-toast";
import { useTheme as useNextTheme } from "next-themes";

const PhotoPage = () => {
  // const proModal = useProModal();
  const router = useRouter();
  const proModal = useProModal();
  const [photos, setPhotos] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { theme } = useNextTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundImage = 'url("/bg11.jpg")';
    } else {
      document.body.style.backgroundImage = 'url("/bg31.jpg")';
    }
  }, [theme]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setPhotos(urls);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="pt-[100px] pb-10">
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
              bg-[#3e395e46]
              shadow-md
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="conversation_input border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-4 text-black dark:bg-[#ffffffd5]"
                      disabled={isLoading}
                      placeholder="A Unicorn Horse on the Moon."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2 bg-[#bfdbfe] rounded-md dark:bg-[#0b0404c7]">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2 bg-[#bfdbfe] dark:bg-[#0b0404c7] rounded-md">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full  bg-black hover:bg-[#2f14c8] dark:text-black dark:hover:bg-[#75b2b0] dark:bg-[#3d549f]"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {photos.length === 0 && !isLoading && !errorMessage && (
          <Empty label="No images generated." />
        )}
        {!isLoading && errorMessage && (
          <div
            className={cn(
              "mt-8 p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted shadow-2xl"
            )}
          >
            <BotAvatar />
            <p className="text-sm">
              Error: API Rate Limit Exceeded.
              <span className="text-gray-400/95"> {errorMessage}</span>{" "}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              {/* NOTE: Remember, we are using image `url`, so we have to define its HOSTNAME in `next.config.js` */}
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={src} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(src)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
