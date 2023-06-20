import { FastifyInstance } from "fastify";
import {
  CreateListBody,
  allListJsonSchema,
  createListJsonSchema,
  deleteListJsonSchema,
  updateListJsonSchema,
} from "../schemas/list";
import {
  allListHandler,
  createListHandler,
  deleteListHandler,
  updateListHandler,
} from "../controllers/list";

export default async function listsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: allListJsonSchema,
    },
    allListHandler
  );

  app.post<{
    Body: CreateListBody;
  }>(
    "/create",
    {
      schema: createListJsonSchema,
    },
    createListHandler
  );

  app.patch<{
    Body: CreateListBody;
  }>(
    "/update/:id",
    {
      schema: updateListJsonSchema,
    },
    updateListHandler
  );

  app.delete(
    "/delete/:id",
    {
      schema: deleteListJsonSchema,
    },
    deleteListHandler
  );
}
