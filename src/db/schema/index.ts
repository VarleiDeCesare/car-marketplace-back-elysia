import * as authSchema from './auth'
import { vehicle } from './vehicle'

export const table = {
    vehicle,
} as const

export const schema = {
    ...authSchema,
    vehicle,
} as const
