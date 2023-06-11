import { eq } from "drizzle-orm";
import { lists } from "../db/schema";
import { db } from "../db";

export async function createList(nama_list: string, status: 'completed' | 'cancelled'){
    const result = await db.insert(lists).values({ nama_list, status }).returning()
    return result[0]
}

export async function updateList(nama_list: string, status: 'completed' | 'cancelled', id: string, updatedAt: Date){
    const result = await db.update(lists).set({ nama_list, status, updatedAt }).where(eq(lists.id,parseInt(id))).returning()
    return result[0]
}

export async function deleteList(id: string){
    const result = await db.delete(lists).where(eq(lists.id,parseInt(id))).returning()
    return result[0]
}

export async function selectWhereId(id: string) {
    let result = await db.select().from(lists).where(eq(lists.id,parseInt(id)))
    return result[0]
}

export async function selectAll() {
    let result = await db.select().from(lists)
    return result
}
