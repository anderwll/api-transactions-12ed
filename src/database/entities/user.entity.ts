import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { TransactionEntity } from "./transaction.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @OneToMany(() => TransactionEntity, (trans) => trans.user)
  transactions: TransactionEntity[];
}
