import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  getAllCustomers() {
    return this.customerService.getAllCustomers();
  }
  @Post()
  createCustomer(@Body() body: CreateCustomerDto) {
    return this.customerService.addCustomer(body);
  }
}
