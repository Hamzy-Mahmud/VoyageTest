import { Transaction } from 'src/transactions/entity/transactions.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  telephone: number;

  @CreateDateColumn()
  created_date: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.customer_id)
  transactions?: Transaction[];
}
