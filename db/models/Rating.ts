import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";
import { ProductModel } from "./ProductModel";

@Table
export class Rating extends Model {
  @AllowNull(false)
  @Column
  rate: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => ProductModel)
  @AllowNull(false)
  @Column
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
