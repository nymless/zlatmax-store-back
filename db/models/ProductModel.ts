import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { Type } from "./Type";
import { Rating } from "./Rating";
import { ModelInfo } from "./ModelInfo";
import { ModelGallery } from "./ModelGallery";

@Table
export class ProductModel extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @Default(0)
  @Column
  rating: number;

  @Unique
  @AllowNull
  @Column
  img: string;

  @AllowNull
  @Column
  totalLength: number;

  @AllowNull
  @Column
  bladeLength: number;

  @AllowNull
  @Column
  bladeWidth: number;

  @ForeignKey(() => Type)
  @AllowNull(false)
  @Column
  typeId: number;

  @ForeignKey(() => Category)
  @AllowNull
  @Column
  categoryId: number;

  @ForeignKey(() => Brand)
  @AllowNull(false)
  @Column
  brandId: number;

  @BelongsTo(() => Type)
  type: Type;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Brand)
  manufacturer: Brand;

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => ModelInfo)
  modelInfos: ModelInfo[];

  @HasMany(() => ModelGallery)
  modelGalleries: ModelGallery[];
}
