// import { NextFunction, Request, Response } from "express";
// import { UploadedFile } from "express-fileupload";
// import { ApiError } from "../errors/ApiError";
// import { Product } from "../db/models/Product";
// import { ModelGallery } from "../db/models/ModelGallery";
// import { ModelInfo } from "../db/models/ModelInfo";
//
// const path = require("path");
// const uuid = require("uuid");
//
// export class ProductController {
//   async create(req: Request, res: Response, next: NextFunction) {
//     try {
//       const {
//         name,
//         info,
//         price,
//         typeId,
//         modelId,
//         categoryId,
//         manufacturerId,
//         materialId
//       } = req.body;
//
//       const { img, gallery } = req.files;
//
//       if (Array.isArray(img)) {
//         return next(ApiError.badRequest("img form accepts only one file"));
//       }
//
//       // TODO: jpg validation or conversion
//       const fileName = uuid.v4() + ".jpg";
//       img.mv(path.resolve(__dirname, "..", "static", fileName)).then(() => {});
//
//       const product = await Product.create({
//         name,
//         price,
//         img: fileName,
//         typeId,
//         modelId,
//         categoryId,
//         manufacturerId,
//         materialId
//       });
//
//       if (gallery) {
//         const galleryFileHandler = (img: UploadedFile, foreignId: number) => {
//           const fileName = uuid.v4() + ".jpg";
//           img.mv(path.resolve(__dirname, "..", "static", fileName));
//           ModelGallery.create({
//             img: fileName,
//             productId: foreignId
//           });
//         };
//
//         if (Array.isArray(gallery)) {
//           gallery.forEach((single) => {
//             galleryFileHandler(single, product.id);
//           });
//         } else {
//           galleryFileHandler(gallery, product.id);
//         }
//       }
//
//       if (info) {
//         const parsedInfo = JSON.parse(info);
//
//         parsedInfo.forEach((info) => {
//           ModelInfo.create({
//             title: info.title,
//             description: info.description,
//             productId: product.id
//           });
//         });
//       }
//
//       return res.json(product);
//     } catch (e) {
//       next(ApiError.internal(e.message));
//     }
//   }
//
//   async getAll(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { typeId, categoryId, manufacturerId, materialId } = req.query;
//       const page = Number(req.query.page || 1);
//       const limit = Number(req.query.limit || 9);
//       const offset = page * limit - limit;
//       const allId = { typeId, categoryId, manufacturerId, materialId };
//
//       const entries = Object.entries(allId).filter((entry) => {
//         return Number.isInteger(Number.parseInt(entry[1] as string));
//       });
//
//       const realId = Object.fromEntries(entries);
//
//       const devices = await Product.findAndCountAll({
//         where: realId,
//         limit,
//         offset
//       });
//
//       return res.json(devices);
//     } catch (e) {
//       next(ApiError.internal(e.message));
//     }
//   }
//
//   async getOne(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const device = await Product.findOne({
//         where: { id },
//         include: [
//           { model: ModelInfo, as: "info" },
//           { model: ModelGallery, as: "gallery" }
//         ]
//       });
//       return res.json(device);
//     } catch (e) {
//       next(ApiError.internal(e.message));
//     }
//   }
// }
