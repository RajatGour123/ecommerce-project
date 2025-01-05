import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.modulel';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'products_orders_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
