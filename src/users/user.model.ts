import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  declare firstName: string;

  @Column
  declare lastName: string;

  @Column
  declare email: string;

  // @Column({ defaultValue: true })
  // isActive: boolean;
}
