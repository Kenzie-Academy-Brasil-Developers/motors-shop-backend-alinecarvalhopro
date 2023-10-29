import path from "node:path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const DataSourceConfig = (): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, "entities/**.{js,ts}");
  const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}");
  const nodeEnv: string = process.env.NODE_ENV;

  if (!process.env.DATABASE_URL) {
    throw new Error("Env var DATABASE_URL does not exists");
  }

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: true,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }
};

const AppDataSource: DataSource = new DataSource(DataSourceConfig());

export { AppDataSource };
