import { FastifyInstance } from "fastify";
import { CreateKategoriBody, createKategoriJsonSchema, updateKategoriJsonSchema } from "../schemas/kategori";
import { createKategoriHandler, updateKategoriHandler } from "../controllers/kategori";

export default async  function kategorisRoutes(app: FastifyInstance) {
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
}