import { Elysia } from 'elysia'
import { cors } from '@elysia/cors'
import { vehicleModule } from './modules/vehicle'
import { auth, OpenAPI } from './lib/auth';
import { openapi } from '@elysia/openapi'

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

export const appBetterAuth = new Elysia({ name: 'better-auth' })
.mount(auth.handler)
.macro({
    auth: {
        async resolve({ status, request: { headers } }) {
            const session = await auth.api.getSession({
                headers
            })
            if (!session) return status(401)
            return {
                user: session.user,
                session: session.session
            }
        }
    }
});

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

console.log(`Server is running on http://${app.server?.hostname}:${app.server?.port}`)
