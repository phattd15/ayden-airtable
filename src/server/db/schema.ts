import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `airtable-ayden_${name}`);

export const posts = createTable(
  'post',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    name: varchar('name', { length: 256 }),
    createdById: varchar('created_by', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    createdByIdIdx: index('created_by_idx').on(example.createdById),
    nameIndex: index('name_idx').on(example.name),
  })
);

export const users = createTable('user', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('email_verified', {
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 }),
});

export const accounts = createTable(
  'account',
  {
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_user_id_idx').on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('session_token', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_user_id_idx').on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const bases = createTable('base', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const tables = createTable('table', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  baseId: integer('base_id')
    .notNull()
    .references(() => bases.id),
});

export const columnsType = pgEnum('columns', ['Number', 'Text']);

export const columns = createTable('column', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  tableId: integer('table_id')
    .notNull()
    .references(() => tables.id),
  columnIndex: integer('column_index').notNull(),
  type: columnsType('type').notNull(),
});

export const rows = createTable('row', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  tableId: integer('table_id')
    .notNull()
    .references(() => tables.id),
  rowIndex: integer('row_index').notNull(),
});

export const cells = createTable(
  'cell',
  {
    data: text('data'),
    rowId: integer('row_id')
      .notNull()
      .references(() => rows.id),
    columnId: integer('column_id')
      .notNull()
      .references(() => columns.id),
  },
  (cell) => ({
    uniqueRowColumn: primaryKey({ columns: [cell.rowId, cell.columnId] }),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  bases: many(bases),
}));

export const basesRelations = relations(bases, ({ many, one }) => ({
  tables: many(tables),
  user: one(users, { fields: [bases.userId], references: [users.id] }),
}));

export const tablesRelations = relations(tables, ({ many, one }) => ({
  columns: many(columns),
  rows: many(rows),
  base: one(bases, { fields: [tables.baseId], references: [bases.id] }),
}));

export const columnsRelations = relations(columns, ({ many, one }) => ({
  cells: many(cells),
  table: one(tables, { fields: [columns.tableId], references: [tables.id] }),
}));

export const rowsRelations = relations(rows, ({ many, one }) => ({
  cells: many(cells),
  table: one(tables, { fields: [rows.tableId], references: [tables.id] }),
}));

export const cellsRelations = relations(cells, ({ one }) => ({
  row: one(rows, { fields: [cells.rowId], references: [rows.id] }),
  column: one(columns, { fields: [cells.columnId], references: [columns.id] }),
}));
