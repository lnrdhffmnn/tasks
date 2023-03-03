import { z } from "zod";

export const Task = z.object({
  content: z.string(),
  completed: z.boolean().default(false),
});
