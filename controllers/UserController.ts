import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { User } from "../db/models/User";
import { Cart } from "../db/models/Cart";
import { UserTokenSchema } from "../validation/UserTokenSchema";
import { UserCreateRequest, UserLoginRequest } from '../validation/UserRequests';

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id: number, email: string, role: string) => {
  return jwt.sign({ id, email, role }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
};

export class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const validRequest = await UserCreateRequest.parseAsync(req);

      const allParams = {
        email: validRequest.body.email,
        password: validRequest.body.password,
        role: validRequest.body.role,
        firstName: validRequest.body.firstName,
        lastName: validRequest.body.lastName,
        middleName: validRequest.body.middleName,
        preferredName: validRequest.body.preferredName,
      };

      const registered = await User.findOne({
        where: { email: allParams.email },
      });

      if (registered) {
        return next(ApiError.badRequest("Email already used for registration"));
      }

      const entries = Object.entries(allParams).filter((entry) => {
        return Boolean(entry[1]);
      });
      const realParams = Object.fromEntries(entries);

      realParams.password = await bcrypt.hash(allParams.password, 5);

      // todo: prevent unauthorized ADMIN role registration
      const user = await User.create(realParams);
      const token = generateJwt(user.id, user.email, user.role);

      // todo: check if cart not created by orm, db automatic
      await Cart.create({ userId: user.id });

      return res.json({ token });
    } catch (e) {
      if (e instanceof Error) {
        next(ApiError.internal(e.message));
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const validRequest = await UserLoginRequest.parseAsync(req);

    const { email, password } = validRequest.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest("UserModel not found"));
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return next(ApiError.badRequest("Wrong password"));
    }

    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async check(req: Request, res: Response) {
    const user = req.body[Symbol.for("user")];

    const validUser = await UserTokenSchema.parseAsync(user);

    const token = generateJwt(validUser.id, validUser.email, validUser.role);

    return res.json({ token });
  }
}
