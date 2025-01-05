import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Order extends Model<Order> {
  @Column
  customerId: string;

  @Column(DataType.ARRAY(DataType.JSON))
  products: {
    productId: number;
    name: string;
    price: number;
  }[];

  @Column
  quantity: number;

  @Column(DataType.JSON)
  orderInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    contact: string;
  };
}
