import { NextFunction, Request, Response } from "express";
import { validExtensions } from "../utils/consts";
import { defineDescriptor } from "../utils/defineDescriptor";

const uuid = require("uuid");
const path = require("path");

const imgSymbol: unique symbol = Symbol.for("img");

export const imgFileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const img = req.files?.img;

    if (!img) {
      return next();
    }

    if (Array.isArray(img)) {
      return res.status(404).json({ message: "form should contain one file" });
    }

    const extension = img.name.split(".").pop();

    if (!validExtensions.some((valid) => valid === extension)) {
      return res.status(404).json({
        message: "file extension should be " + validExtensions.join(", "),
      });
    }

    const fileName = uuid.v4() + "." + extension;

    Object.defineProperty(req.body, imgSymbol, defineDescriptor(fileName));

    await img.mv(path.resolve(__dirname, "..", "static", fileName));

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
