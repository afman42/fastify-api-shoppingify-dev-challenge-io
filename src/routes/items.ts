import { FastifyInstance } from "fastify";
import { CreateItemBody, allItemJsonSchema, createItemJsonSchema, deleteItemJsonSchema, updateItemJsonSchema } from "../schemas/item";
import { allItemHandler, createItemHandler, deleteItemHandler, updateItemHandler } from "../controllers/item";

export default async  function itemsRoutes(app: FastifyInstance) {
    app.get(
        "/",
        {
            schema: allItemJsonSchema
        },
        allItemHandler
    )

    app.post<{
        Body: CreateItemBody,
    }>(
        "/create",
        {
            schema: createItemJsonSchema
        },
        createItemHandler
    )

    app.patch<{
        Body: CreateItemBody,
    }>(
        "/update/:id",
        {
            schema: updateItemJsonSchema
        },
        updateItemHandler
    )

    app.delete(
        "/delete/:id",
        {
            schema: deleteItemJsonSchema
        },
        deleteItemHandler
    )
}