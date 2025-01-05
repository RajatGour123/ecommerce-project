import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/checkout')
  async create(@Body() orderDto: any) {
    return this.ordersService.create(orderDto);
  }

  @Get('/history')
  async getOrderHistory(): Promise<any[]> {
    return this.ordersService.findOrdersWithCustomerDetails();
  }
}
