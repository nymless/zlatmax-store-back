import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Table
export class CartProduct extends Model {
  @ForeignKey(() => Cart)
  @AllowNull(false)
  @Column
  cartId: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  productId: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;
}
