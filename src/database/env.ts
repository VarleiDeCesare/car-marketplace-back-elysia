import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type PostgresConfig = {
    host: string
    port: number
    database: string
    user: string
    password: string
    ssl: boolean
}

const ENV_FILES = ['.env', '.env.local'] as const

const loadEnvFile = (fileName: string) => {
    const filePath = resolve(process.cwd(), fileName)

    if (!existsSync(filePath)) {
        return
    }

    const fileContent = readFileSync(filePath, 'utf8')

    for (const line of fileContent.split(/\r?\n/)) {
        const trimmedLine = line.trim()

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            continue
        }

        const separatorIndex = trimmedLine.indexOf('=')

        if (separatorIndex === -1) {
            continue
        }

        const key = trimmedLine.slice(0, separatorIndex).trim()
        const rawValue = trimmedLine.slice(separatorIndex + 1).trim()
        const normalizedValue = rawValue.replace(/^['"]|['"]$/g, '')

        if (!process.env[key]) {
            process.env[key] = normalizedValue
        }
    }
}

for (const fileName of ENV_FILES) {
    loadEnvFile(fileName)
}

const getRequiredEnv = (key: string) => {
    const value = process.env[key]?.trim()

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`)
    }

    return value
}

export const getPostgresConfig = (): PostgresConfig => ({
    host: process.env.POSTGRES_HOST?.trim() || 'localhost',
    port: Number(process.env.POSTGRES_PORT?.trim() || '5432'),
    database: getRequiredEnv('POSTGRES_DB'),
    user: getRequiredEnv('POSTGRES_USER'),
    password: getRequiredEnv('POSTGRES_PASSWORD'),
    ssl: process.env.POSTGRES_SSL === 'true',
})

