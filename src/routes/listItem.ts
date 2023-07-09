import { FastifyInstance } from "fastify";
import {
  CreateListItemBody,
  createListItemJsonSchema,
  deleteListItemJsonSchema,
  selectIdListItemJsonSchema,
  sumListItemJsonSchema,
} from "../schemas/listItem";
import {
  createListItemHandler,
  deleteListItemHandler,
  selectWhereIdListItemHandler,
  sumAndPercentageItemOrKategori,
} from "../controllers/listItem";

export default async function listItemRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: sumListItemJsonSchema,
    },
    sumAndPercentageItemOrKategori
  );
  app.get(
    "/:id",
    {
      schema: selectIdListItemJsonSchema,
    },
    selectWhereIdListItemHandler
  );
  app.post<{
    Body: CreateListItemBody;
  }>(
    "/create",
    {
      schema: createListItemJsonSchema,
    },
    createListItemHandler
  );

  app.delete(
    "/delete/:id",
    {
      schema: deleteListItemJsonSchema,
    },
    deleteListItemHandler
  );
}
