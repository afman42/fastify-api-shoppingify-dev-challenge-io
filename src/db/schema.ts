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
  idKategori: serial("id_kategori").references(() => kategoris.id),
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
  idItem: integer("id_item").references(() => lists.id).notNull(),
  jumlah: integer("jumlah").notNull(),
  ...createdAtAndUpdatedAt
})

export const listRelations = relations(lists,({many}) => ({
  items: many(listItem)
}))

export const itemRelations = relations(items,({ many }) => ({
  kategoris: many(kategoris),
  lists: many(lists)
}))