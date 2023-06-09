import { FastifyInstance } from "fastify";
import { CreateKategoriBody, allKategoriJsonSchema, createKategoriJsonSchema, deleteKategoriJsonSchema, updateKategoriJsonSchema } from "../schemas/kategori";
import { allKategoriHandler, createKategoriHandler, deleteKategoriHandler, updateKategoriHandler } from "../controllers/kategori";

export default async  function kategorisRoutes(app: FastifyInstance) {
    app.get(
        "/",
        {
            schema: allKategoriJsonSchema
        },
        allKategoriHandler
    )

    app.post<{
        Body: CreateKategoriBody,
    }>(
        "/create",
        {
            schema: createKategoriJsonSchema
        },
        createKategoriHandler
    )

    app.patch<{
        Body: CreateKategoriBody,
    }>(
        "/update/:id",
        {
            schema: updateKategoriJsonSchema
        },
        updateKategoriHandler
    )

    app.delete(
        "/delete/:id",
        {
            schema: deleteKategoriJsonSchema
        },
        deleteKategoriHandler
    )
}