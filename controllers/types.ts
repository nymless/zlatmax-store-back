import { Request } from "express";

const imgSymbol: unique symbol = Symbol.for("img");

// export interface ProductModelCreateRequest extends Request {
//   body: {
//     name: string;
//     typeId: string;
//     brandId: string;
//     categoryId?: string;
//     bladeMaterialId?: string;
//     totalLength?: string;
//     bladeLength?: string;
//     bladeWidth?: string;
//     info?: string;
//     [imgSymbol]?: string;
//   };
// }

// export interface ProductModelGetAllRequest extends Request {
//   query: {
//     typeId: string;
//     brandId: string;
//     categoryId?: string;
//     bladeMaterialId?: string;
//     totalLength?: string;
//     bladeLength?: string;
//     bladeWidth?: string;
//     page?: string;
//     limit?: string;
//   };
// }

// export interface UserCreateRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//     role: string;
//     firstName: string;
//     lastName: string;
//     middleName?: string;
//     preferredName?: string;
//   };
// }
//
// export interface UserLoginRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//   };
// }
//
// export interface SelectorCreateRequest extends Request {
//   body: {
//     id: string;
//     name?: string;
//     [imgSymbol]?: string;
//   };
// }
