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
import { Gilding } from "./Gilding";
import { HandleMaterial } from "./HandleMaterial";

@Table
export class HandguardMaterial extends Model {
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

  @BelongsToMany(() => Gilding, () => Junction)
  gilding: Gilding[];

  @BelongsToMany(() => Type, () => Junction)
  types: Type[];

  @BelongsToMany(() => Category, () => Junction)
  categories: Category[];

  @BelongsToMany(() => Brand, () => Junction)
  manufacturers: Brand[];
}
