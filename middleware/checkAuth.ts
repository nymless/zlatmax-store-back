import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.body[Symbol.for("user")] = jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Unauthorized" });
  }
};
