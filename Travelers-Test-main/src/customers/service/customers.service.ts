import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entity/transactions.entity';
import { Repository, DataSource } from 'typeorm';
import { CustomerDto } from '../dto/customer.dto';
import { Customer } from '../entity/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    public  customerRepository: Repository<Customer>,
    private dataSource: DataSource,
  ) {}

  async create(customer: CustomerDto): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.dataSource
      .getRepository(Customer)
      .createQueryBuilder('customer')
      .orderBy('id', 'DESC')
      .take(10)
      .getMany();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOneBy({ id });
  }

  async findCustomerTransactions(id: number): Promise<Customer> {
    try {
      const customerInformation = await this.dataSource
      .createQueryBuilder(Customer, 'customer')
      .leftJoinAndSelect(
        'customer.transactions',
        'transactions',
        'transactions.customer_id = :id',
        { id },
      )
      .where('transactions.customer_id = :id', { id })
      .orderBy('transactions.id', 'DESC')
      .getOne();

    return this.mapFindCustomerTransactionsResponse(customerInformation);
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'customer_id should exists',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  private mapFindCustomerTransactionsResponse(
    customerInformation: Customer,
  ): Customer {
    customerInformation.transactions = customerInformation.transactions.slice(
      0,
      10,
    );

    return customerInformation;
  }
}
