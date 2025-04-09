import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomerDto } from '../dto/customer.dto';
import { Customer } from '../entity/customers.entity';
import { CustomersService } from '../service/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCustomers(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getCustomer(@Param('id') id: number): Promise<Customer> {
    return await this.customerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/transactions')
  async getCustomerTransactions(@Param('id') id: number): Promise<Customer> {
    return await this.customerService.findCustomerTransactions(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCustomers(@Body() customer: CustomerDto): Promise<Customer> {
    return await this.customerService.create(customer);
  }
}
