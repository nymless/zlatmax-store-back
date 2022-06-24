import { z } from "zod";

export const UserTokenSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
});
