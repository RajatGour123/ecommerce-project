import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.model';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() customerDto: any) {
    return this.customersService.create(customerDto);
  }

  @Post('/login')
  async login(@Body() credentials: { email: string; password: string }) {
    const customer = await this.customersService.login(credentials.email, credentials.password);
    if (customer) {
      return { id: customer.id, name: customer.name };
    }
    return { error: 'Invalid credentials' };
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }
}
