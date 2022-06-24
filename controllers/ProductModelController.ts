import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ApiError } from "../errors/ApiError";
import { ModelGallery } from "../db/models/ModelGallery";
import { ModelInfo } from "../db/models/ModelInfo";
import { ProductModel } from "../db/models/ProductModel";
import { validExtensions } from "../utils/consts";
import {
  ProductModelCreateRequest,
  ProductModelGetAllRequest,
  ProductModelGetOneRequest,
} from "../validation/ProductModelRequests";
import { ModelInfoSchema } from "../validation/ModelInfoSchema";

const uuid = require("uuid");
const path = require("path");

export class ProductModelController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validReq = await ProductModelCreateRequest.parseAsync(req);

      const allParams = {
        name: validReq.body.name,
        typeId: validReq.body.typeId,
        brandId: validReq.body.brandId,
        categoryId: validReq.body.categoryId,
        totalLength: validReq.body.totalLength,
        bladeLength: validReq.body.bladeLength,
        bladeWidth: validReq.body.bladeWidth,
        img: req.body[Symbol.for("img")] as string | undefined,
      };

      const entries = Object.entries(allParams).filter((param) => {
        return Boolean(param[1]);
      });
      const realParams = Object.fromEntries(entries);

      const product = await ProductModel.create(realParams);
      const modelGallery = req.files && req.files.modelGallery;

      if (modelGallery) {
        const galleryFileHandler = async (
          img: UploadedFile,
          foreignId: number
        ) => {
          const extension = img.name.split(".").pop();

          if (!validExtensions.some((valid) => valid === extension)) {
            return res.status(404).json({
              message: "file extension should be " + validExtensions.join(", "),
            });
          }

          const fileName = uuid.v4() + "." + extension;

          await img.mv(path.resolve(__dirname, "..", "static", fileName));

          await ModelGallery.create({
            img: fileName,
            productModelId: foreignId,
          });
        };

        if (Array.isArray(modelGallery)) {
          modelGallery.forEach((single) => {
            galleryFileHandler(single, product.id);
          });
        } else {
          await galleryFileHandler(modelGallery, product.id);
        }
      }

      const modelInfo = validReq.body.modelInfo;

      if (modelInfo) {
        const parsedInfo = JSON.parse(modelInfo);

        const validInfo = await ModelInfoSchema.parseAsync(parsedInfo);

        validInfo.forEach((item) => {
          ModelInfo.create({
            title: item.title,
            description: item.description,
            productModelId: product.id,
          });
        });
      }

      return res.json(product);
    } catch (e) {
      if (e instanceof Error) {
        next(ApiError.internal(e.message));
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const validReq = await ProductModelGetAllRequest.parseAsync(req);

      const page = validReq.query.page;
      const limit = validReq.query.limit;
      const offset = page * limit - limit;
      const allParams = {
        typeId: validReq.query.typeId,
        brandId: validReq.query.brandId,
        categoryId: validReq.query.categoryId,
        totalLength: validReq.query.totalLength,
        bladeLength: validReq.query.bladeLength,
        bladeWidth: validReq.query.bladeWidth,
      };

      const entries = Object.entries(allParams).filter((entry) => {
        return Boolean(entry[1]);
      });
      const realParams = Object.fromEntries(entries);

      const devices = await ProductModel.findAndCountAll({
        where: realParams,
        limit,
        offset,
      });

      return res.json(devices);
    } catch (e) {
      if (e instanceof Error) {
        next(ApiError.internal(e.message));
      }
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const validReq = await ProductModelGetOneRequest.parseAsync(req);

      const { id } = validReq.params;
      const device = await ProductModel.findOne({
        where: { id },
        include: [{ model: ModelInfo }, { model: ModelGallery }],
      });
      return res.json(device);
    } catch (e) {
      if (e instanceof Error) {
        next(ApiError.internal(e.message));
      }
    }
  }
}
