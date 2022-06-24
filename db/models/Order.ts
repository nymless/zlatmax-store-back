import {
  AllowNull,
  BelongsTo,
  Column, CreatedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from "./User";
import { PaymentType } from './PaymentType';

@Table
export class Order extends Model {
  @AllowNull(false)
  @Column
  totalPrice: number;

  @AllowNull(false)
  @Column
  paid: boolean;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => PaymentType)
  @AllowNull(false)
  @Column
  typeId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => PaymentType)
  type: PaymentType;
}
