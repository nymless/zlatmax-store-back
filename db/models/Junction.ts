import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Type } from "./Type";
import { Category } from "./Category";
import { Brand } from "./Brand";
import { BladeMaterial } from "./BladeMaterial";
import { HandleMaterial } from "./HandleMaterial";
import { Gilding } from './Gilding';
import { HandguardMaterial } from './HandguardMaterial';

@Table
export class Junction extends Model {
  @ForeignKey(() => Gilding)
  @Column
  gildingId: number;

  @ForeignKey(() => HandleMaterial)
  @Column
  handleMaterialId: number;

  @ForeignKey(() => HandguardMaterial)
  @Column
  handguardMaterialId: number;

  @ForeignKey(() => BladeMaterial)
  @Column
  bladeMaterialId: number;

  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @ForeignKey(() => Brand)
  @Column
  brandId: number;
}
