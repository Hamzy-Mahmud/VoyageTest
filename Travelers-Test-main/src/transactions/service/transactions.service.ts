import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/service/customers.service';
import { Repository, DataSource } from 'typeorm';
import { TransactionDto } from '../dto/transaction.dto';
import { Transaction } from '../entity/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private customerService:CustomersService,
  ) {}

  async create(transaction: TransactionDto): Promise<Transaction> {
    const customer = await this.customerService.findOne(transaction.customer_id);
    if (customer) {
      return await this.transactionRepository.save(transaction);
    }
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'customer_id should exists',
    }, HttpStatus.BAD_REQUEST);
  }
}
