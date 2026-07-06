import { Elysia } from 'elysia'
import { cors } from '@elysia/cors'
import { vehicleModule } from './modules/vehicle'
import { OpenAPI } from './lib/auth';
import { openapi } from '@elysia/openapi'
import { appBetterAuth } from './lib/app-better-auth'

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

const app = new Elysia()
    .use(appOpenApi)
    .use(appCors)
    .use(appBetterAuth)
    .use(vehicleModule)
    .get('/user', ({ user }) => {
        return user
    }, {
        auth: true
    })
    .get('/', () => 'Hello World!') // health check endpoint in the future.
    .listen(3000)

const serverUrl = `http://${app.server?.hostname}:${app.server?.port}`

console.log(
    [
        `Server is running on ${serverUrl}`,
        `Application docs: ${serverUrl}/openapi`,
        `Better Auth docs: ${serverUrl}/openapi (tag: Better Auth)`,
    ].join('\n'),
)
