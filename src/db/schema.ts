import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  text,
  pgEnum,
  integer
} from "drizzle-orm/pg-core"

export const statusListEnum = pgEnum('status_list',['completed','cancelled']);

let createdAtAndUpdatedAt = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}

export const kategoris = pgTable("kategoris", {
  id: serial("id").primaryKey().notNull(),
  namaKategori: varchar("nama_kategori").notNull(),
  ...createdAtAndUpdatedAt
})

export const items = pgTable("items",{
  id: serial('id').primaryKey().notNull(),
  nama: varchar('nama').notNull(),
  catatan: text("catatan"),
  gambar_url: text('gambar_url'),
  idKategori: integer("id_kategori").references(() => kategoris.id).notNull(),
  ...createdAtAndUpdatedAt
})

export const lists = pgTable("lists",{
  id: serial('id').primaryKey().notNull(),
  nama_list: varchar("nama_list").notNull(),
  status: statusListEnum("status_list").default("completed").notNull(),
  ...createdAtAndUpdatedAt
})


export const listItem = pgTable("list_item",{
  id: serial('id').primaryKey().notNull(),
  idList: integer("id_list").references(() => lists.id).notNull(),
  idItem: integer("id_item").references(() => items.id).notNull(),
  jumlah: integer("jumlah").notNull(),
  ...createdAtAndUpdatedAt
})

export const kategoriRelations = relations(kategoris, ({ many }) => ({
  items: many(items)
}))

export const listRelations = relations(lists,({ one }) => ({
  listItem: one(listItem, {
    fields: [lists.id],
    references: [listItem.idList]
  })
}))

export const itemRelations = relations(items,({ many, one }) => ({
  lists: many(lists),
  kategori: one(kategoris,{
    fields: [items.idKategori],
    references: [kategoris.id]
  }),
  listItem: one(listItem, {
    fields: [items.id],
    references: [listItem.idItem]
  })
}))


export const listItemRelations = relations(listItem, ({ one, many }) => ({
	list: one(lists, {
		fields: [listItem.idList],
		references: [lists.id],
	}),
	items: many(items)
}));
