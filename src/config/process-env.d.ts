import type { AppProcessEnv } from "./env";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppProcessEnv {}
  }
}

export {};
