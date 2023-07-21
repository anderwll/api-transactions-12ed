// import { v4 } from "uuid";
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    // this.id = v4();
    // this.createdAt = new Date();
    // this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
