export {
    account,
    accountRelations,
    session,
    sessionRelations,
    user,
    userRelations,
    verification,
} from './auth'
export { vehicle } from './vehicle'

import {
    account,
    accountRelations,
    session,
    sessionRelations,
    user,
    userRelations,
    verification,
} from './auth'
import { vehicle } from './vehicle'

export const schema = {
    user,
    session,
    account,
    verification,
    userRelations,
    sessionRelations,
    accountRelations,
    vehicle,
} as const

export const table = schema

export type Schema = typeof schema
export type Table = typeof table
