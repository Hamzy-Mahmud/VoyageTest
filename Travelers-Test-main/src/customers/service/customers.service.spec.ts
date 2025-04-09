import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import {
  getRepositoryToken,
  TypeOrmModule,
  getDataSourceToken,
} from '@nestjs/typeorm';
import { Customer } from '../entity/customers.entity';
import { CustomersController } from '../controller/customers.controller';
import { CustomerDto } from '../dto/customer.dto';
import { Repository, DataSource } from 'typeorm';

// @ts-ignore
export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    getRepository: jest.fn(() => ({
      createQueryBuilder: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          take: jest.fn(() => ({
            getMany: jest.fn().mockResolvedValue([
              {
                name: 'test 4',
                telephone: 8977173447,
                id: 9,
                created_date: new Date('2022-09-11T07:20:19.328Z'),
              },
              {
                name: 'test 3',
                telephone: 8977173007,
                id: 8,
                created_date: new Date('2022-09-11T07:20:19.328Z'),
              },
            ]),
          })),
        })),
      })),
    })),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn(()=>({
        where : jest.fn(() => ({
          orderBy: jest.fn(()=>({
            getOne: jest.fn().mockResolvedValue({
              "id": 1,
              "name": "test 1",
              "telephone": 3636699999,
              "created_date": "2022-09-09T02:51:44.000Z",
              "transactions": [
                  {
                      "id": 13,
                      "amount": -3736699898,
                      "created_date": "2022-09-09T17:43:26.000Z"
                  },
                  {
                      "id": 10,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:47:29.000Z"
                  },
                  {
                      "id": 9,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:45:07.000Z"
                  },
                  {
                      "id": 8,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:42:45.000Z"
                  },
                  {
                      "id": 7,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  },
                  {
                      "id": 6,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  },
                  {
                      "id": 5,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  },
                  {
                      "id": 4,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  },
                  {
                      "id": 3,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  },
                  {
                      "id": 2,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  },
                  {
                      "id": 1,
                      "amount": 3736699898,
                      "created_date": "2022-09-09T16:38:55.000Z"
                  }
              ]
          })
          }))
        }))
      }))
    })),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    save: jest.fn().mockResolvedValue({
      name: 'test 4',
      telephone: 8977173447,
      id: 9,
      created_date: new Date('2022-09-11T07:20:19.328Z'),
    }),
    findOneBy: jest.fn().mockResolvedValue({
      name: 'test 1',
      telephone: 4958173447,
      id: 1,
      created_date: new Date('2022-09-11T07:20:19.328Z'),
    }),
    // ...
  }),
);

describe('CustomersService', () => {
  let service: CustomersService;
  let repositoryMock: MockType<Repository<Customer>>;
  let dataSourceMock: MockType<DataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Customer]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'travelers',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getDataSourceToken(),
          useFactory: dataSourceMockFactory,
        },
      ],
      controllers: [CustomersController],
      exports: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repositoryMock = module.get(getRepositoryToken(Customer));
    dataSourceMock = module.get(getDataSourceToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer ', async () => {
    const body: CustomerDto = {
      name: 'test 4',
      telephone: 8977173447,
    };

    const response: any = {
      name: 'test 4',
      telephone: 8977173447,
      id: 9,
      created_date: new Date('2022-09-11T07:20:19.328Z'),
    };

    const createresponse = await service.create(body);
    expect(createresponse).toMatchObject(response);
  });

  it('should find all costumers ', async () => {
    const findAllReponse = await service.findAll();
    expect(findAllReponse).toMatchSnapshot();
  });
  
  it('should find one customer ', async () => {
    const findOneResponse = await service.findOne(1);
    expect(findOneResponse).toMatchSnapshot();
  });

  it('should return the customer transactions ', async () => {
    const findCustomerTransactionsResponse = await service.findCustomerTransactions(1);
    expect(findCustomerTransactionsResponse).toMatchSnapshot();
  });
});
