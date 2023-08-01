import * as z from "zod";

// 1 means atleast 1 character required
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Video Prompt is required.", // Although we are not using this message anywhere, but we we defined here, we only require this no. like we defined  `1` here
  }),
});
