import pino, { stdSerializers } from "pino";
import { getEnv } from "./config/env";

const env = getEnv();

export const logger = pino({
  level: env.LOG_LEVEL ?? "info",
  base: {
    app: env.APP_NAME ?? "car-marketplace-back",
    env: env.NODE_ENV ?? "development",
  },
  serializers: {
    err: stdSerializers.err,
  }
});
