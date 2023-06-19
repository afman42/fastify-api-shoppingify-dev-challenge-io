import { FastifyInstance } from "fastify";
import {
  CreateItemBody,
  allItemJsonSchema,
  allKategoriWithItemQueryJsonSchema,
  createItemJsonSchema,
  deleteItemJsonSchema,
  updateItemJsonSchema,
} from "../schemas/item";
import {
  allItemHandler,
  createItemHandler,
  deleteItemHandler,
  searchItemHandler,
  updateItemHandler,
} from "../controllers/item";

export default async function itemsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: allItemJsonSchema,
    },
    allItemHandler
  );
  app.get(
    "/search",
    {
      schema: allKategoriWithItemQueryJsonSchema,
    },
    searchItemHandler
  );
  app.post<{
    Body: CreateItemBody;
  }>(
    "/create",
    {
      schema: createItemJsonSchema,
    },
    createItemHandler
  );

  app.patch<{
    Body: CreateItemBody;
  }>(
    "/update/:id",
    {
      schema: updateItemJsonSchema,
    },
    updateItemHandler
  );

  app.delete(
    "/delete/:id",
    {
      schema: deleteItemJsonSchema,
    },
    deleteItemHandler
  );
}
