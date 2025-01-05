import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './customer.model';
import * as bcrypt from 'bcrypt';
import * as amqp from 'amqplib';

@Injectable()
export class CustomersService implements OnModuleInit, OnModuleDestroy {
  private channel: amqp.Channel;

  constructor(
    @InjectModel(Customer) private readonly customerModel: typeof Customer,
  ) {}

  async onModuleInit() {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertExchange('customers_exchange', 'topic', { durable: true });
    const q = await this.channel.assertQueue('customer_update_queue', { exclusive: true });

    this.channel.bindQueue(q.queue, 'customers_exchange', 'customer.update');

    this.channel.consume(q.queue, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        await this.updateCustomer(data);
        this.channel.ack(msg);
      }
    });
  }

  async onModuleDestroy() {
    await this.channel.close();
  }

  async updateCustomer(data: any): Promise<Customer> {
    const [customer, created] = await this.customerModel.findOrCreate({
      where: { email: data.email },
      defaults: data,
    });
    if (!created) {
      await customer.update(data);
    }
    return customer;
  }

  async create(customerDto: any): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(customerDto.password, 10);
    const customer = await this.customerModel.create({
      ...customerDto,
      password: hashedPassword,
    });

    // Publish customer created event
    this.channel.publish('customers_exchange', 'customer.created', Buffer.from(JSON.stringify(customer)));

    return customer;
  }

  async login(email: string, password: string): Promise<Customer | null> {
    const customer = await this.customerModel.findOne({ where: { email } });
    if (customer && (await bcrypt.compare(password, customer.password))) {
      return customer;
    }
    return null;
  }

  findAll(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  findOne(id: string): Promise<Customer> {
    return this.customerModel.findOne({ where: { id } });
  }
}
