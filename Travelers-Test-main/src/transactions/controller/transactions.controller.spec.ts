import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { Transaction } from '../entity/transactions.entity';
import { TransactionsService } from '../service/transactions.service';
import { TransactionDto } from '../dto/transaction.dto';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CustomersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'travelers',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Transaction]),
      ],
      providers: [TransactionsService],
      controllers: [TransactionsController],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer transaction', () => {
    const body: TransactionDto = {
      customer_id: 1,
      amount: -3736699898,
    };
    const response: Transaction = {
      customer_id: 1,
      amount: -3736699898,
      id: 13,
      created_date: new Date('2022-09-09T17:43:26.000Z'),
    };

    jest
      .spyOn(TransactionsService.prototype, 'create')
      .mockResolvedValue(response);

    expect(controller.createTransactions(body)).toBeDefined();
  });
});
