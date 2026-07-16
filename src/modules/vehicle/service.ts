import type { CreateVehicleBody, VehicleResponse } from './model'
import type { VehicleRepositoryContract } from './repository'

export interface VehicleServiceContract {
    list(): Promise<VehicleResponse[]>
    create(data: CreateVehicleBody): Promise<VehicleResponse>
}

export class VehicleService implements VehicleServiceContract {
    constructor(private readonly vehicleRepository: VehicleRepositoryContract) {}

    async list() {
        return this.vehicleRepository.list()
    }

    async create(data: CreateVehicleBody) {
        return this.vehicleRepository.create(data)
    }
}
