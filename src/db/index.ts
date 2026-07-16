// fallow-ignore-file coverage-gaps
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
import { getPostgresConfig } from "../config/env";

// Do NOT use Pick<> — it strips generics from query builder methods.
// Use the full concrete type returned by drizzle().
export type DrizzleDb = ReturnType<typeof drizzle>;
export type DbClient = DrizzleDb;

let pool: Pool | undefined;
let db: DbClient | undefined;
let drizzleDb: DrizzleDb | undefined;
let initPromise: Promise<DrizzleDb> | undefined;

export const resetDb = () => {
  pool = undefined;
  db = undefined;
  drizzleDb = undefined;
  initPromise = undefined;
};

export const injectDb = (nextDb: DbClient) => {
  resetDb();
  db = nextDb;
};

const initEnvDb = async (): Promise<DrizzleDb> => {
  const postgres = getPostgresConfig();
  const config: PoolConfig = {
    host: postgres.host,
    port: postgres.port,
    ssl: postgres.ssl,
    user: postgres.user,
    password: postgres.password,
    database: postgres.database,
  };

  pool = new Pool(config);

  drizzleDb = drizzle(pool);
  db = drizzleDb;
  return drizzleDb;
};

// Promise-based lock to ensure we only initialize the DB connection once,
// even if multiple requests call getDb()/getDrizzleDb() concurrently.
const ensureEnvDb = async (): Promise<DrizzleDb> => {
  if (drizzleDb) return drizzleDb;
  if (!initPromise) {
    initPromise = initEnvDb().catch((err) => {
      // Allow retry after a failed init.
      initPromise = undefined;
      throw err;
    });
  }
  return await initPromise;
};

export const getDb = async (): Promise<DbClient> => {
  if (db) return db;
  await ensureEnvDb();
  return db!;
};

export const getDrizzleDb = async (): Promise<DrizzleDb> => {
  return await ensureEnvDb();
};

export const getConnection = () => pool;
