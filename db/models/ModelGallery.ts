import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { ProductModel } from "./ProductModel";

@Table
export class ModelGallery extends Model {
  @Unique
  @AllowNull(false)
  @Column
  img: string;

  @ForeignKey(() => ProductModel)
  @AllowNull(false)
  @Column
  productModelId: number;

  @BelongsTo(() => ProductModel)
  productModel: ProductModel;
}
