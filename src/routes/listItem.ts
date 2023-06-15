import { FastifyInstance } from "fastify";
import {
  CreateListItemBody,
  createListItemJsonSchema,
  deleteListItemJsonSchema,
} from "../schemas/listItem";
import {
  createListItemHandler,
  deleteListItemHandler,
} from "../controllers/listItem";

export default async function listItemRoutes(app: FastifyInstance) {
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
