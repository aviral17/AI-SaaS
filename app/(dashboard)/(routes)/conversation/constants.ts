import * as z from "zod";

// 1 means atleast 1 character required
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});
