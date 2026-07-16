import { t } from "elysia";
import type { StaticDecode } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const APP_ENVIRONMENTS = [
  "development",
  "production",
  "provision",
  "test",
] as const;

export const APP_LOG_LEVELS = [
  "debug",
  "error",
  "fatal",
  "info",
  "silent",
  "trace",
  "warn",
] as const;

export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];
export type AppLogLevel = (typeof APP_LOG_LEVELS)[number];

export const APP_ENV_SCHEMA = t.Object({
  APP_NAME: t.Optional(t.String({ minLength: 1 })),
  BETTER_AUTH_SECRET: t.String({ minLength: 1 }),
  BETTER_AUTH_URL: t.Optional(
    t.String({
      format: "uri",
      minLength: 1,
    }),
  ),
  DB_HOST: t.String({ minLength: 1 }),
  DB_NAME: t.String({ minLength: 1 }),
  DB_PASS: t.String({ minLength: 1 }),
  DB_PORT: t.Optional(
    t.Numeric({
      default: 5432,
      maximum: 65535,
      minimum: 0,
    }),
  ),
  DB_SSL: t.Optional(t.BooleanString()),
  DB_USER: t.String({ minLength: 1 }),
  LOG_LEVEL: t.Optional(
    t.UnionEnum(APP_LOG_LEVELS, {
      default: "info",
    }),
  ),
  NODE_ENV: t.Optional(
    t.UnionEnum(APP_ENVIRONMENTS, {
      default: "development",
    }),
  ),
});

export type AppEnv = StaticDecode<typeof APP_ENV_SCHEMA>;
export type AppEnvKey = keyof AppEnv;
export type AppProcessEnv = Partial<Record<AppEnvKey, string>>;

const normalizeEnvInput = (config: Record<string, unknown>) => {
  const normalizedConfig = { ...config };

  for (const [key, value] of Object.entries(normalizedConfig)) {
    if (typeof value !== "string") {
      continue;
    }

    const trimmedValue = value.trim();
    normalizedConfig[key] = trimmedValue.length > 0 ? trimmedValue : undefined;
  }

  return normalizedConfig;
};

const formatEnvErrors = (config: Record<string, unknown>) => {
  return [...Value.Errors(APP_ENV_SCHEMA, config)].map((error) => {
    const key = error.path.replace(/^\//, "") || "root";
    return `${key}: ${error.message}`;
  });
};

export const validateEnv = (config: Record<string, unknown>) => {
  const normalizedConfig = normalizeEnvInput(config);

  if (!Value.Check(APP_ENV_SCHEMA, normalizedConfig)) {
    const messages = formatEnvErrors(normalizedConfig);
    throw new Error(`Invalid environment variables: ${messages.join("; ")}`);
  }

  return Value.Decode(APP_ENV_SCHEMA, normalizedConfig);
};

let cachedEnv: AppEnv | undefined;

export const getEnv = (config: Record<string, unknown> = process.env): AppEnv => {
  if (config !== process.env) {
    return validateEnv(config);
  }

  cachedEnv ??= validateEnv(config);
  return cachedEnv;
};

export const getPostgresConfig = (config: Record<string, unknown> = process.env) => {
  const env = getEnv(config);

  return {
    host: env.DB_HOST,
    port: env.DB_PORT,
    ssl: env.DB_SSL,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  };
};
