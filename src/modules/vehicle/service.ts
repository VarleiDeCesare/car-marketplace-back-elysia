import { db } from '../../database/client'
import { table } from '../../database/schema'

import type { CreateVehicleBody } from './model'

export abstract class VehicleService {
    static async list() {
        return db.select().from(table.vehicle)
    }

    static async create(data: CreateVehicleBody) {
        console.log('Creating vehicle with data:', data)
        const [vehicle] = await db.insert(table.vehicle).values(data).returning()

        if (!vehicle) {
            throw new Error('Failed to create vehicle')
        }

        return vehicle
    }
}
