import { ApiError } from "../errors/ApiError";
import { Request, Response } from "express";

export const errorHandler = function (err: Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unknown server Error" });
};
