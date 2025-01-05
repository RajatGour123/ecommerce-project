import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import * as amqp from 'amqplib';
import axios from 'axios';

@Injectable()
export class OrdersService implements OnModuleInit, OnModuleDestroy {
  private channel: amqp.Channel;

  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
  ) {}

  async onModuleInit() {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertExchange('orders_exchange', 'topic', { durable: true });
  }

  async onModuleDestroy() {
    await this.channel.close();
  }

  async create(orderDto: any): Promise<Order> {
    const order = await this.orderModel.create({
      customerId: orderDto.customerId,
      products: orderDto.products.map((product) => ({
        productId: product.productId,
        name: product.name,
        price: product.price,
      })),
      quantity: orderDto.products.length,
      orderInfo: orderDto.orderInfo,
    });

    // Publish an order created event
    this.channel.publish('orders_exchange', 'order.created', Buffer.from(JSON.stringify({
      id: order.id,
      customerId: order.customerId,
      products: order.products,
      orderInfo: order.orderInfo,
    })));

    return order;
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  findOne(id: string): Promise<Order> {
    return this.orderModel.findOne({ where: { id } });
  }

  async findOrdersWithCustomerDetails(): Promise<any[]> {
    const orders = await this.orderModel.findAll();
    
    const ordersWithCustomerDetails = await Promise.all(
      orders.map(async (order) => {
        // Fetch customer details
        console.log(order.customerId,"order.customerIdorder.customerId")
        const response = await axios.get(`http://localhost:3002/customers/${order.customerId}`);
        const customer = response.data;
        console.log(customer,"customercustomercustomercustomercustomercustomer")


        return {
          id: order.id,
          products: order.products,
          orderInfo: order.orderInfo,
          customer: customer
        };
      })
    );

    return ordersWithCustomerDetails;
  }
}
