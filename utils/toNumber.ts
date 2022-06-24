import { z } from "zod";

export const toNumber = (
  val: string | undefined,
  ctx: z.RefinementCtx,
  def?: number
) => {
  const parsed = parseInt(val as string);

  if (!isNaN(parsed)) {
    return parsed;
  }

  if (def) {
    return def;
  }

  if (val) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    });
  }

  return parsed;
};
