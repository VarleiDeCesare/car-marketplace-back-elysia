import { Elysia, t } from 'elysia'

import { createVehicleBody, vehicleResponse } from './model'
import { VehicleService } from './service'
import { appBetterAuth } from '../../lib/app-better-auth'

export const vehicleModule = new Elysia({ name: 'vehicle.module' })
    .use(appBetterAuth)
    .get('/vehicles', () => {
        return VehicleService.list()
    }, {
        auth: true,
        response: t.Array(vehicleResponse),
    })
    .post(
        '/vehicle',
        async ({ body, set }) => {
            const vehicle = await VehicleService.create(body)

            set.status = 201

            return vehicle
        },
        {
            body: createVehicleBody,
            response: {
                201: vehicleResponse,
            },
        },
    )
