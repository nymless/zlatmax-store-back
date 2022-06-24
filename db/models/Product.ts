import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { CartProduct } from "./CartProduct";
import { ProductModel } from "./ProductModel";
import { BladeMaterial } from "./BladeMaterial";
import { Gilding } from "./Gilding";
import { HandleMaterial } from "./HandleMaterial";
import { HandguardMaterial } from "./HandguardMaterial";
import { OrderProduct } from "./OrderProduct";

@Table
export class Product extends Model {
  @Unique
  @AllowNull
  @Column
  name: string;

  @AllowNull(false)
  @Column
  price: number;

  @ForeignKey(() => ProductModel)
  @AllowNull(false)
  @Column
  productModelId: number;

  @ForeignKey(() => Gilding)
  @AllowNull
  @Column
  gildingId: number;

  @ForeignKey(() => HandleMaterial)
  @AllowNull
  @Column
  handleMaterialId: number;

  @ForeignKey(() => HandguardMaterial)
  @AllowNull
  @Column
  handguardMaterialId: number;

  @ForeignKey(() => BladeMaterial)
  @AllowNull
  @Column
  bladeMaterialId: number;

  @BelongsTo(() => ProductModel)
  productModel: ProductModel;

  @BelongsTo(() => Gilding)
  gilding: Gilding;

  @BelongsTo(() => HandleMaterial)
  handleMaterial: HandleMaterial;

  @BelongsTo(() => HandguardMaterial)
  handguardMaterial: HandguardMaterial;

  @BelongsTo(() => BladeMaterial)
  bladeMaterial: BladeMaterial;

  @HasMany(() => CartProduct)
  cartProducts: CartProduct[];

  @HasMany(() => OrderProduct)
  orderProducts: OrderProduct[];
}
