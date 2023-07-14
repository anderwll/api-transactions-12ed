import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity";

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
  // entities: [UserEntity],
});

export default dataSource;
