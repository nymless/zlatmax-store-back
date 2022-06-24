import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./Product";
import { Order } from "./Order";

@Table
export class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column
  orderId: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  productId: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;
}
