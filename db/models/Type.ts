import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Junction } from "./Junction";
import { BladeMaterial } from "./BladeMaterial";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { HandleMaterial } from "./HandleMaterial";
import { HandguardMaterial } from "./HandguardMaterial";
import { Gilding } from "./Gilding";
import { ProductModel } from "./ProductModel";

@Table
export class Type extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string;

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

  @BelongsToMany(() => Category, () => Junction)
  categories: Category[];

  @BelongsToMany(() => Brand, () => Junction)
  manufacturers: Brand[];
}
