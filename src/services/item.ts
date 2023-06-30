import { eq, sql } from "drizzle-orm";
import { items, kategoris } from "../db/schema";
import { db } from "../db";

export async function createItem(
  nama: string,
  catatan: string,
  gambar_url: string,
  idKategori: number
) {
  const result = await db
    .insert(items)
    .values({ nama, catatan, gambar_url, idKategori })
    .returning();
  return result[0];
}

export async function updateItem(
  nama: string,
  catatan: string,
  gambar_url: string,
  idKategori: number,
  id: string
) {
  const result = await db
    .update(items)
    .set({ nama, catatan, gambar_url, idKategori, updatedAt: new Date() })
    .where(eq(items.id, parseInt(id)))
    .returning();
  return result[0];
}

export async function deleteItem(id: string) {
  const result = await db
    .delete(items)
    .where(eq(items.id, parseInt(id)))
    .returning();
  return result[0];
}

export async function selectWhereId(id: string) {
  let result = await db
    .select()
    .from(items)
    .where(eq(items.id, parseInt(id)));
  return result[0];
}

export async function selectAll() {
  let result = await db.select().from(items);
  return result;
}

export async function searchNamaItem(namaItem: string) {
  let result = await db.execute(
    sql`select json_agg(
        json_build_object(
          'nama_kategori', kategori_nama,
          'items', items_in_kategori
        )
      ) res
      from (
        select 
          ${kategoris.namaKategori} as kategori_nama,
          json_agg(json_build_object('namaItem',t.nama)) as items_in_kategori
        from ${kategoris}
        inner join items t on t.id_kategori = ${kategoris.id}
        where t.nama ilike '%${sql.raw(namaItem)}%'
        group by ${kategoris.id}, ${kategoris.namaKategori}
      ) t`
  );
  return result.rows[0].res;
}
