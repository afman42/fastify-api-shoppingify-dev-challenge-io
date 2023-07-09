import { eq } from "drizzle-orm";
import { db } from "../db";
import { listItem, lists } from "../db/schema";
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
