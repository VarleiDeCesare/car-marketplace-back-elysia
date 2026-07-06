import { defineConfig } from 'drizzle-kit'

import { getPostgresConfig } from './src/database/env'

const postgres = getPostgresConfig()

export default defineConfig({
    schema: './src/database/schema/index.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        host: postgres.host,
        port: postgres.port,
        user: postgres.user,
        password: postgres.password,
        database: postgres.database,
        ssl: postgres.ssl,
    },
    strict: true,
    verbose: true,
})
