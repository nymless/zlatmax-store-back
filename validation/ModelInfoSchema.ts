import { z } from "zod";

export const ModelInfoSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);
