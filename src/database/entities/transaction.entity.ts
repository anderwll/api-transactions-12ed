import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "transactions" })
export class TransactionEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  type: string;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
