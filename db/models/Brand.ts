import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Type } from "./Type";
import { Junction } from "./Junction";
import { Category } from "./Category";
import { BladeMaterial } from "./BladeMaterial";
import { HandleMaterial } from "./HandleMaterial";
import { HandguardMaterial } from "./HandguardMaterial";
import { Gilding } from "./Gilding";
import { ProductModel } from "./ProductModel";

@Table
export class Brand extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @Unique
  @AllowNull
  @Column
  img: string;

  @HasMany(() => ProductModel)
  productModels: ProductModel[];

  @BelongsToMany(() => BladeMaterial, () => Junction)
  bladeMaterials: BladeMaterial[];

  @BelongsToMany(() => HandleMaterial, () => Junction)
  handleMaterials: HandleMaterial[];

  @BelongsToMany(() => HandguardMaterial, () => Junction)
  handguardMaterials: HandguardMaterial[];

  @BelongsToMany(() => Gilding, () => Junction)
  gilding: Gilding[];

  @BelongsToMany(() => Type, () => Junction)
  types: Type[];

  @BelongsToMany(() => Category, () => Junction)
  categories: Category[];
}
