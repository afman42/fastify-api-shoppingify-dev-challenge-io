import { FastifyInstance } from "fastify";
import {
  CreateKategoriBody,
  allKategoriJsonSchema,
  allKategoriWithItemJsonSchema,
  createKategoriJsonSchema,
  deleteKategoriJsonSchema,
  searchNamaKategoriJsonSchema,
  updateKategoriJsonSchema,
} from "../schemas/kategori";
import {
  allKategoriHandler,
  allKategoriWithItemHandler,
  createKategoriHandler,
  deleteKategoriHandler,
  searchNameKategoriHandler,
  updateKategoriHandler,
} from "../controllers/kategori";

export default async function kategorisRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: allKategoriJsonSchema,
    },
    allKategoriHandler
  );

  app.get(
    "/search",
    {
      schema: searchNamaKategoriJsonSchema,
    },
    searchNameKategoriHandler
  );

  app.get(
    "/with-item",
    {
      schema: allKategoriWithItemJsonSchema,
    },
    allKategoriWithItemHandler
  );

  app.post<{
    Body: CreateKategoriBody;
  }>(
    "/create",
    {
      schema: createKategoriJsonSchema,
    },
    createKategoriHandler
  );

  app.patch<{
    Body: CreateKategoriBody;
  }>(
    "/update/:id",
    {
      schema: updateKategoriJsonSchema,
    },
    updateKategoriHandler
  );

  app.delete(
    "/delete/:id",
    {
      schema: deleteKategoriJsonSchema,
    },
    deleteKategoriHandler
  );
}
