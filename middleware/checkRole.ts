import { NextFunction, Request, Response } from "express";
import { UserTokenSchema } from "../validation/UserTokenSchema";

const jwt = require("jsonwebtoken");

export const checkRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decodedUser = jwt.verify(token, process.env.JWT_KEY);

      const validUser = await UserTokenSchema.parseAsync(decodedUser);

      if (validUser.role !== role) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.body[Symbol.for("user")] = validUser;

      next();
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
