import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateTableUsers1689892033847 } from "../migrations/1689892033847-CreateTableUsers";
import { TransactionEntity1689895189070 } from "../migrations/1689895189070-TransactionEntity";
import { TransactionEntity } from "../entities/transaction.entity";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  synchronize: false,
  schema: "transactions",
  // entities: ["src/database/entities/**/*entity.js"],
  entities: [UserEntity, TransactionEntity],
  // migrations: ["src/database/migrations/**/*.js"],
  migrations: [CreateTableUsers1689892033847, TransactionEntity1689895189070],
  migrationsTableName: "my-migrations",
});

export default dataSource;
