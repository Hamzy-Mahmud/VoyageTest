import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from '../service/customers.service';
import { Customer } from '../entity/customers.entity';
import { CustomerDto } from '../dto/customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;

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
      providers: [CustomersService],
      controllers: [CustomersController],
      exports: [CustomersService],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should getCustomers', () => {
    const response: Customer[] = [
      {
        id: 8,
        name: 'test 7',
        telephone: 8977173447,
        created_date: new Date(),
      },
      {
        id: 7,
        name: 'test 6',
        telephone: 8977773447,
        created_date: new Date(),
      },
      {
        id: 6,
        name: 'test 5',
        telephone: 897777344,
        created_date: new Date(),
      },
      {
        id: 5,
        name: 'test 4',
        telephone: 8977773449,
        created_date: new Date(),
      },
    ];
    jest
      .spyOn(CustomersService.prototype, 'findAll')
      .mockResolvedValue(response);

    expect(controller.getCustomers()).toBeDefined();
  });

  it('should getCustomer', () => {
    const response: Customer = {
      id: 8,
      name: 'test 7',
      telephone: 8977173447,
      created_date: new Date(),
    };
    jest
      .spyOn(CustomersService.prototype, 'findOne')
      .mockResolvedValue(response);

    expect(controller.getCustomer(8)).toBeDefined();
  });

  it('should getCustomerTransactions', () => {
    const response: Customer = {
      id: 1,
      name: 'test 1',
      telephone: 3636699999,
      created_date: new Date(),
      transactions: [
        {
          id: 13,
          amount: -3736699898,
          created_date: new Date(),
          customer_id: 1,
        },
        {
          id: 10,
          amount: 3736699898,
          created_date: new Date(),
          customer_id: 1,
        },
        {
          id: 9,
          amount: 3736699898,
          created_date: new Date(),
          customer_id: 1,
        },
        {
          id: 8,
          amount: 3736699898,
          created_date: new Date(),
          customer_id: 1,
        },
        {
          id: 7,
          amount: 3736699898,
          created_date: new Date(),
          customer_id: 1,
        },
      ],
    };

    jest
      .spyOn(CustomersService.prototype, 'findCustomerTransactions')
      .mockResolvedValue(response);

    expect(controller.getCustomerTransactions(1)).toBeDefined();
  });

  it('should createCustomers', () => {
    const body: CustomerDto = {
      name: 'test 4',
      telephone: 8977173447,
    };
    const response: Customer = {
      name: 'test 4',
      telephone: 8977173447,
      id: 9,
      created_date: new Date(),
    };

    jest
      .spyOn(CustomersService.prototype, 'create')
      .mockResolvedValue(response);

    expect(controller.createCustomers(body)).toBeDefined();
  });
});
