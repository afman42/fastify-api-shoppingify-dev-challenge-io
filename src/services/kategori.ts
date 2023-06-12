import { eq, sql } from "drizzle-orm";
import { kategoris } from "../db/schema";
import { db } from "../db";

export async function createKategori(namaKategori: string){
    const result = await db.insert(kategoris).values({ namaKategori }).returning()
    return result[0]
}

export async function updateKategori(namaKategori: string, id: string){
    const result = await db.update(kategoris).set({ namaKategori, updatedAt: new Date() }).where(eq(kategoris.id,parseInt(id))).returning()
    return result[0]
}

export async function deleteKategori(id: string){
    const result = await db.delete(kategoris).where(eq(kategoris.id,parseInt(id))).returning()
    return result[0]
}

export async function selectWhereId(id: string) {
    let result = await db.select().from(kategoris).where(eq(kategoris.id,parseInt(id)))
    return result[0]
}

export async function selectAll() {
    let result = await db.select().from(kategoris)
    return result
}

export async function kategoriWithItem(){
    let result = await db.query.kategoris.findMany({
        with: {
            items: true
        }
    })
    return result
}