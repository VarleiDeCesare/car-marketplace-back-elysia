import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { getPostgresConfig } from './env'
import { schema } from './schema'

const postgres = getPostgresConfig()

export const pool = new Pool({
    host: postgres.host,
    port: postgres.port,
    database: postgres.database,
    user: postgres.user,
    password: postgres.password,
    ssl: postgres.ssl ? { rejectUnauthorized: false } : false,
})

export const db = drizzle(pool, { schema })
