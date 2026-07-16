import { Elysia } from 'elysia'
import { cors } from '@elysia/cors'
import { getDb } from './db'
import { OpenAPI } from './lib/auth';
import { openapi } from '@elysia/openapi'
import { appBetterAuth } from './lib/app-better-auth'
import { checkApplicationHealth, hcApp } from './modules/health-check';
import { createVehicleModule } from './modules/vehicle'
import { DrizzleVehicleRepository } from './modules/vehicle/repository'
import { VehicleService } from './modules/vehicle/service'
import { logger } from './logger';
import { observability } from './config/plugins/observability';

export const appOpenApi = new Elysia().use(
    openapi({
        documentation: {
            components: await OpenAPI.components,
            paths: await OpenAPI.getPaths()
        }
    })
);

export const appCors = new Elysia({ name: 'cors' }).use(
    cors    ({
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

const db = await getDb()

//vehicle module
const vehicleRepository = new DrizzleVehicleRepository(db)
const vehicleService = new VehicleService(vehicleRepository)
const vehicleModule = createVehicleModule({ vehicleService })

const app = new Elysia()
    .use(appOpenApi)
    .use(appCors)
    .use(appBetterAuth)
    .use(vehicleModule)
    .use(observability())
    .use(hcApp)
    .get('/user', ({ user }) => {
        return user
    }, {
        auth: true
    })
    .get('/', () => 'Hello World!') // health check endpoint in the future.
    .listen(3000)

const serverUrl = `http://${app.server?.hostname}:${app.server?.port}`

await checkApplicationHealth()
logger.info({
    host: `Server is running on ${serverUrl}`,
    documentation: `Application docs: ${serverUrl}/openapi`
});
