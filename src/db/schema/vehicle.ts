import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const vehicle = pgTable('vehicle', {
    id: varchar('id')
        .$defaultFn(() => createId())
        .primaryKey(),
    make: varchar('make').notNull(),
    model: varchar('model').notNull(),
    year: varchar('year').notNull(),
    price: varchar('price').notNull(),
    km: integer('km'),
    description: varchar('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})
