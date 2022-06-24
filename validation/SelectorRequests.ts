import { z } from "zod";
import { FileArray } from "express-fileupload";

export const SelectorCreateRequest = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const SelectorUpdateRequest = z.object({
  body: z.object({
    id: z.number().positive(),
    name: z.string().optional(),
  }),
});
