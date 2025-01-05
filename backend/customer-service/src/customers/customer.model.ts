import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Customer extends Model<Customer> {
  @Column
  name: string;

  @Column
  contact: string;

  @Column
  email: string;

  @Column
  password: string;
}
