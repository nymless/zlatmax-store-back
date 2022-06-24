import {
  AllowNull,
  Column,
  Default,
  HasMany,
  HasOne,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Rating } from "./Rating";
import { Cart } from "./Cart";
import { Order } from './Order';

@Table
export class User extends Model {
  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Default("USER")
  @Column
  role: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull
  @Column
  middleName: string;

  @AllowNull
  @Column
  preferredName: string;

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => Order)
  orders: Order[];

  @HasOne(() => Cart)
  cart: Cart;
}
