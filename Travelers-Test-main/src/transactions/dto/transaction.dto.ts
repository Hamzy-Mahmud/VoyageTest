import { IsInt, IsNumber} from 'class-validator';

export class TransactionDto {
  @IsInt()
  customer_id: number;

  @IsNumber()
  amount: number;
}