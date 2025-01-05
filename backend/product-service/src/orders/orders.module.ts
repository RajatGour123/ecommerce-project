import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.model';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    RMQModule.forRoot({
      exchangeName: 'orders_exchange',
      connections: [
        {
          login: 'guest',
          password: 'guest',
          host: 'localhost',
        },
      ],
      prefetchCount: 32,
      isGlobalPrefetchCount: true,
      serviceName: 'orders_service',
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
