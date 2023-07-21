import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

let entities = ["src/database/entities/**/*.ts"];
let migrations = ["src/database/migrations/**/*.ts"];

if (process.env.DB_ENV === "production") {
  entities = ["build/database/entities/**/*.js"];
  migrations = ["build/database/migrations/**/*.js"];
}

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  synchronize: false,
  schema: "transactions",
  entities,
  migrations,
  migrationsTableName: "my-migrations",
});

export default dataSource;
