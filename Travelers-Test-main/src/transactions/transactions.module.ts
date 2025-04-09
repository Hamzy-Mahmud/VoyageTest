import { Module } from '@nestjs/common';
import { TransactionsService } from './service/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transactions.entity';
import { TransactionsController } from './controller/transactions.controller';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [ CustomersModule, TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
