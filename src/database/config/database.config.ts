import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateTableUsers1689892033847 } from "../migrations/1689892033847-CreateTableUsers";

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
  entities: ["src/database/entities/**/*entity.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  // migrations: [CreateTableUsers1689892033847],
  migrationsTableName: "my-migrations",
});

export default dataSource;
