import { eq } from "drizzle-orm";
import { db } from "../db";
import { listItem, lists } from "../db/schema";
import { createList } from "./list";

type IColumnList = {
  nama_list: string;
  status: "completed" | "cancelled";
};

export type IColumnItem = {
  itemId: string;
  jumlah: string;
};

export async function createListItem(
  lists: IColumnList,
  items: Array<IColumnItem>
) {
  if (items.length > 0) {
    const resultList = await createList(lists.nama_list, lists.status);
    if (resultList) {
      for (let index = 0; index < items.length; index++) {
        await db.insert(listItem).values({
          idList: resultList.id,
          idItem: parseInt(items[index].itemId),
          jumlah: parseInt(items[index].jumlah),
        });
      }
      const resultListWithItem = await db.query.lists.findFirst({
        where: (lists, { eq }) => eq(lists.id, resultList.id),
        with: {
          listItem: {
            with: {
              items: {
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
