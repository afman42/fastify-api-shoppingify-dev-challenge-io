import { desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { listItem, lists, items, kategoris } from "../db/schema";
import { createList } from "./list";

type IColumnList = {
  nama_list: string;
  status: "completed" | "cancelled";
};

export type IColumnItem = {
  idItem: string;
  jumlah: string;
};

type AppendIColumnItem = {
  idList: number;
  idItem: number;
  jumlah: number;
  id?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};
export async function createListItem(
  lists: IColumnList,
  items: Array<IColumnItem>
) {
  if (items.length > 0) {
    const resultList = await createList(lists.nama_list, lists.status);
    if (resultList) {
      const appendIdItems = items.map((itm: IColumnItem) => ({
        idList: resultList.id,
        jumlah: parseInt(itm.jumlah),
        idItem: parseInt(itm.idItem),
      })) satisfies AppendIColumnItem[];
      await db.insert(listItem).values(appendIdItems as AppendIColumnItem[]);
      return await selectWhereIdWithListItem(resultList.id);
    }
    throw Error("The Error must field items array");
  }
}

export async function deleteListItem(id: string) {
  const resultListItem = await db
    .delete(listItem)
    .where(eq(listItem.idList, parseInt(id)))
    .returning();
  if (resultListItem[0].idList) {
    const resultList = await db
      .delete(lists)
      .where(eq(lists.id, parseInt(id)))
      .returning();
    return resultList;
  }
}

export async function selectWhereIdWithListItem(id: number) {
  const resultListWithItem = await db.query.lists.findFirst({
    where: (lists, { eq }) => eq(lists.id, id),
    with: {
      listItems: {
        with: {
          item: {
            with: {
              kategori: true,
            },
          },
        },
      },
    },
  });

  return resultListWithItem;
}

export async function sumAndPercentageItem() {
  const result = await db
    .select({
      jumlah: sql<string>`sum(${listItem.jumlah}) as jumlah`,
      semua_item: sql<string>`(select sum(li2.jumlah) from list_item li2) as semua_jumlah`,
      nama: items.nama,
    })
    .from(listItem)
    .innerJoin(items, eq(listItem.idItem, items.id))
    .groupBy(items.nama)
    .orderBy(desc(sql`jumlah`))
    .limit(3);

  return result.map(
    (v: { jumlah: string; semua_item: string; nama: string }) => ({
      nama: v.nama,
      percent: Math.round((parseInt(v.jumlah) / parseInt(v.semua_item)) * 100),
    })
  );
}

export async function sumAndPercentageKategori() {
  const result = await db
    .select({
      hitung: sql<string>`count(${kategoris.id}) as hitung`,
      semua_kategori: sql<string>`(select count(k2.id) from list_item li inner join items i on li.id_item = i.id inner join kategoris k2 on i.id_kategori = k2.id) as semua_kategori`,
      nama: kategoris.namaKategori,
    })
    .from(listItem)
    .innerJoin(items, eq(listItem.idItem, items.id))
    .innerJoin(kategoris, eq(items.idKategori, kategoris.id))
    .groupBy(kategoris.namaKategori)
    .orderBy(desc(sql`hitung`))
    .limit(3);

  // return result
  return result.map(
    (v: { hitung: string; semua_kategori: string; nama: string }) => ({
      nama: v.nama,
      percent: Math.round(
        (parseInt(v.hitung) / parseInt(v.semua_kategori)) * 100
      ),
    })
  );
}

export async function sumEveryMonth() {
  const result = await db
    .select({
      trunc_month: sql<string>`date_trunc('month', ${lists.createdAt}) as trunc_month`,
      list_month: sql<string>`trim(to_char(${lists.createdAt},'Month')) as list_month`,
      sum: sql<string>`sum(${listItem.jumlah}) as sum`,
    })
    .from(listItem)
    .innerJoin(items, eq(listItem.idItem, items.id))
    .innerJoin(lists, eq(listItem.idList, lists.id))
    .groupBy(sql`trunc_month`, sql`list_month`)
    .orderBy(desc(sql`list_month`));

  return result.map((item: any) => ({
    month: item.list_month,
    sum: parseInt(item.sum),
  }));
}
