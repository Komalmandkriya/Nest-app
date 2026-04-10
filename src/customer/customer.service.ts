import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];
  getAllCustomers(): Customer[] {
    return this.customers;
  }
  // coming from client so here we use dto
  addCustomer(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer = {
      id: Date.now(),
      ...createCustomerDto,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
}
