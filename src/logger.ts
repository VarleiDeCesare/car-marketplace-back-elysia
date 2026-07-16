import pino, { stdSerializers } from "pino";
import { getEnv } from "./config/env";

const env = getEnv();

export const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    app: env.APP_NAME ?? "car-marketplace-back",
    env: env.NODE_ENV,
  },
  serializers: {
    err: stdSerializers.err,
  }
});
