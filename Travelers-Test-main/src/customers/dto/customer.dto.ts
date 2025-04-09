import { IsString, Min, Max, IsInt } from 'class-validator';

export class CustomerDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  telephone: number;
}
