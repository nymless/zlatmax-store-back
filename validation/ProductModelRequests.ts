import { z } from "zod";
import { toNumber } from "../utils/toNumber";

export const ProductModelCreateRequest = z.object({
  body: z.object({
    name: z.string(),
    typeId: z.string().transform((val, ctx) => toNumber(val, ctx)),
    brandId: z.string().transform((val, ctx) => toNumber(val, ctx)),
    categoryId: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    totalLength: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    bladeLength: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    bladeWidth: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    modelInfo: z.string().optional(),
  }),
  files: z.object({
    modelGallery: z.any({
      required_error:
        "ProductModel should have at least one gallery image file",
    }),
  }),
});

export const ProductModelGetAllRequest = z.object({
  query: z.object({
    typeId: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    brandId: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    categoryId: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    totalLength: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    bladeLength: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    bladeWidth: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
    page: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx, 1)),
    limit: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx, 10)),
  }),
});

export const ProductModelGetOneRequest = z.object({
  params: z.object({
    id: z
      .string()
      .optional()
      .transform((val, ctx) => toNumber(val, ctx)),
  }),
});
