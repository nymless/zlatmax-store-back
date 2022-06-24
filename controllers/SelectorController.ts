import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { defineDescriptor } from "../utils/defineDescriptor";
import { ModelCtor } from "sequelize-typescript";
import { SelectorCreateRequest, SelectorUpdateRequest } from '../validation/SelectorRequests';

export class SelectorController {
  private model: ModelCtor;

  constructor(model: ModelCtor) {
    this.model = model;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validRequest = await SelectorCreateRequest.parseAsync(req);

      const params = { name: validRequest.body.name };
      const img = req.body[Symbol.for("img")] as string | undefined;

      if (img) {
        Object.defineProperty(params, "img", defineDescriptor(img));
      }

      const instance = await this.model.create(params);

      return res.json(instance);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
        next(ApiError.internal(e.message));
      }
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validRequest = await SelectorUpdateRequest.parseAsync(req);

      const { id, name } = validRequest.body;
      const img = req.body[Symbol.for("img")] as string | undefined;

      if (img && !this.model.getAttributes().img) {
        return next(
          ApiError.badRequest("Resource has no img attribute for update")
        );
      }

      const entries = Object.entries({ name, img }).filter((entry) => {
        return Boolean(entry[1]);
      });
      const params = Object.fromEntries(entries);

      await this.model.update(params, { where: { id } });

      const instance = await this.model.findOne({ where: { id } });

      return res.json(instance);
    } catch (e) {
      if (e instanceof Error) {
        next(ApiError.internal(e.message));
      }
    }
  };

  public getAll = async (req: Request, res: Response) => {
    const instances = await this.model.findAll({ order: ["id"] });

    return res.json(instances);
  };
}
