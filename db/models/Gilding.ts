import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Product } from "./Product";
import { Type } from "./Type";
import { Junction } from "./Junction";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { BladeMaterial } from "./BladeMaterial";
import { HandleMaterial } from "./HandleMaterial";
import { HandguardMaterial } from "./HandguardMaterial";

@Table
export class Gilding extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => Product)
  products: Product[];

  @BelongsToMany(() => BladeMaterial, () => Junction)
  bladeMaterials: BladeMaterial[];

  @BelongsToMany(() => HandleMaterial, () => Junction)
  handleMaterials: HandleMaterial[];

  @BelongsToMany(() => HandguardMaterial, () => Junction)
  handguardMaterials: HandguardMaterial[];

  @BelongsToMany(() => Type, () => Junction)
  types: Type[];

  @BelongsToMany(() => Category, () => Junction)
  categories: Category[];

  @BelongsToMany(() => Brand, () => Junction)
  manufacturers: Brand[];
}
