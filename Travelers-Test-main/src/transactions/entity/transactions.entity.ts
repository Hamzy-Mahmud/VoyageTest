import { Customer } from 'src/customers/entity/customers.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer_id: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_date: Date;

}