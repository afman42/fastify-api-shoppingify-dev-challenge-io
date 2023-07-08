import { eq, sql } from "drizzle-orm";
import { lists } from "../db/schema";
import { db } from "../db";

export async function createList(
  nama_list: string,
  status: "completed" | "cancelled"
) {
  const result = await db
    .insert(lists)
    .values({ nama_list, status })
    .returning();
  return result[0];
}

export async function updateList(
  nama_list: string,
  status: "completed" | "cancelled",
  id: string
) {
  const result = await db
    .update(lists)
    .set({ nama_list, status, updatedAt: new Date() })
    .where(eq(lists.id, parseInt(id)))
    .returning();
  return result[0];
}

export async function deleteList(id: string) {
  const result = await db
    .delete(lists)
    .where(eq(lists.id, parseInt(id)))
    .returning();
  return result[0];
}

export async function selectWhereId(id: string) {
  let result = await db
    .select()
    .from(lists)
    .where(eq(lists.id, parseInt(id)));
  return result[0];
}

export async function selectAll() {
  // let result = await db.select().from(lists);
  // catatan date_trunc untuk grouping tanggal, dan count untuk menghitung jumlahnya
  let result = await db.execute(
    sql`
      select row_to_json(art) as result
from (
	select date_trunc('month',l.created_at) as trunc_month, 
		trim(to_char(l.created_at,'Month')) as list_month,
		date_part('year',l.created_at) as list_year,
		count(l.id) as count, 
		( 
		select json_agg(alb) as lists_item from (
			select * from lists where lists.id = any(array_agg(l.id)) order by lists.id desc
		) alb
	) from lists as l group by date_trunc('month',l.created_at), 
		trim(to_char(l.created_at,'Month')), date_part('year',l.created_at) order by trunc_month desc
) art
    `
  );
  return result.rows.map((row: any) => ({
    month: row.result.list_month,
    year: row.result.list_year,
    lists: row.result.lists_item,
  }));
}
