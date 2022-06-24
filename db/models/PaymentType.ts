import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey, HasMany,
  Model,
  Table, Unique,
} from 'sequelize-typescript';
import { User } from "./User";
import { Order } from './Order';

@Table
export class PaymentType extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => Order)
  orders: Order[];
}
