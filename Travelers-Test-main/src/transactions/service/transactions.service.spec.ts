import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { CustomersModule } from 'src/customers/customers.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from '../entity/transactions.entity';
import { CustomersService } from 'src/customers/service/customers.service';
import { TransactionDto } from '../dto/transaction.dto';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    save: jest.fn().mockResolvedValue({
      customer_id: 1,
      amount: -3736699898,
      id: 1,
      created_date: new Date('2022-09-09T17:43:26.000Z'),
    }),
  }),
);

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repositoryMock: MockType<Repository<Transaction>>;

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
      providers: [
        TransactionsService,
        {
          provide: CustomersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              name: 'test 1',
              telephone: 4958173447,
              id: 1,
              created_date: new Date('2022-09-11T07:20:19.328Z'),
            }),
          },
        },
        {
          provide: getRepositoryToken(Transaction),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repositoryMock = module.get(getRepositoryToken(Transaction));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction ', async () => {
    const body: TransactionDto = {
      customer_id: 1,
      amount: -3736699898,
    };

    const createresponse = await service.create(body);
    expect(createresponse).toMatchSnapshot();
  });
});
