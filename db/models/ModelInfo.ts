import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ProductModel } from './ProductModel';

@Table
export class ModelInfo extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => ProductModel)
  @AllowNull(false)
  @Column
  productModelId: number;

  @BelongsTo(() => ProductModel)
  productModel: ProductModel;
}
