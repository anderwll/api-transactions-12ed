import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "transactions" })
export class TransactionEntity extends BaseEntity {
  @Column({ length: "255", nullable: false })
  title: string;

  @Column({ type: "float", nullable: false })
  value: number;

  @Column({ type: "char", length: "1" })
  type: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
