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
import { HandleMaterial } from "./HandleMaterial";
import { HandguardMaterial } from "./HandguardMaterial";
import { Gilding } from "./Gilding";

@Table
export class BladeMaterial extends Model {
  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @Unique
  @AllowNull
  @Column
  img: string;

  @HasMany(() => Product)
  products: Product[];

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

  @BelongsToMany(() => Brand, () => Junction)
  manufacturers: Brand[];
}
