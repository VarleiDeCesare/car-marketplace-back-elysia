import { t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { table } from '../../database/schema'

const vehicleInsertSchema = createInsertSchema(table.vehicle, {
    make: t.String({ maxLength: 100 }),
    model: t.String({ maxLength: 100 }),
    year: t.String({ minLength: 4, maxLength: 4 }),
    price: t.String({ maxLength: 20 }),
    description: t.Optional(t.String()),
    km: t.Optional(t.Integer()),
})

export const createVehicleBody = t.Omit(vehicleInsertSchema, [
    'id',
    'createdAt',
])

export const vehicleResponse = createSelectSchema(table.vehicle, {
    make: t.String({ maxLength: 100 }),
    model: t.String({ maxLength: 100 }),
    year: t.String({ minLength: 4, maxLength: 4 }),
    price: t.String({ maxLength: 20 }),
    description: t.Nullable(t.String()),
    km: t.Nullable(t.Integer())
})

export type CreateVehicleBody = typeof createVehicleBody.static
export type VehicleResponse = typeof vehicleResponse.static
