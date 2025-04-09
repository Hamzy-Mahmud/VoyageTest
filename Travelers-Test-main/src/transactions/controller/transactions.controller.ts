import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransactionDto } from '../dto/transaction.dto';
import { Transaction } from '../entity/transactions.entity';
import { TransactionsService } from '../service/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTransactions(@Body() transaction: TransactionDto): Promise<Transaction> {
    return await this.transactionsService.create(transaction);
  }
}
