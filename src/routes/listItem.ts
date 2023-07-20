import { FastifyInstance } from "fastify";
import {
  CreateListItemBody,
  createListItemJsonSchema,
  deleteListItemJsonSchema,
  selectIdListItemJsonSchema,
  sumEveryMonthListItemJsonSchema,
  sumListItemJsonSchema,
} from "../schemas/listItem";
import {
  createListItemHandler,
  deleteListItemHandler,
  selectWhereIdListItemHandler,
  sumAndPercentageItemOrKategori,
  sumEveryMonthHandler,
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
    "/sum-every-month",
    {
      schema: sumEveryMonthListItemJsonSchema,
    },
    sumEveryMonthHandler
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
