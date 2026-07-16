import type { DbClient } from '../../db'
import { table } from '../../db/schema'

import type { CreateVehicleBody, VehicleResponse } from './model'

export interface VehicleRepositoryContract {
    list(): Promise<VehicleResponse[]>
    create(data: CreateVehicleBody): Promise<VehicleResponse>
}

export class DrizzleVehicleRepository implements VehicleRepositoryContract {
    constructor(private readonly db: DbClient) {}

    async list() {
        return this.db.select().from(table.vehicle)
    }

    async create(data: CreateVehicleBody) {
        const [vehicle] = await this.db.insert(table.vehicle).values(data).returning()

        if (!vehicle) {
            throw new Error('Failed to create vehicle')
        }

        return vehicle
    }
}
