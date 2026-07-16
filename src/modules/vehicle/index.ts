import { Elysia, t } from 'elysia'

import { appBetterAuth } from '../../lib/app-better-auth'
import { createVehicleBody, vehicleResponse } from './model'
import type { VehicleServiceContract } from './service'

export interface VehicleModuleDependencies {
    vehicleService: VehicleServiceContract
}

export const createVehicleModule = ({
    vehicleService,
}: VehicleModuleDependencies) => {
    return new Elysia({
        name: 'vehicle.module',
        prefix: '/vehicles',
        tags: ['Vehicle'],
    })
        .use(appBetterAuth)
        .get('', () => {
            return vehicleService.list()
        }, {
            auth: true,
            response: t.Array(vehicleResponse),
        })
        .post(
            '',
            async ({ body, set }) => {
                const vehicle = await vehicleService.create(body)

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
}
