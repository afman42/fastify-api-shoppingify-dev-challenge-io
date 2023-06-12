import { FastifyReply, FastifyRequest } from "fastify";
import { jsonMetaAndData } from "../utils";
import { createItemValidationSchema } from "../schemas/item";
import { createItem, deleteItem, selectAll, selectWhereId, updateItem } from "../services/item";

export const createItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const nama = (request.body as any).nama as string
        const catatan = (request.body as any).catatan as string
        const gambar_url = (request.body as any).gambar_url as string
        const idKategori = (request.body as any).idKategori as number
    
        const resultValidation = createItemValidationSchema.safeParse({ nama, catatan, gambar_url, idKategori })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            // console.log(fmtResultValidation)
            return reply.code(422).send(jsonMetaAndData(422,"error",fmtResultValidation))
        }
        const result = await createItem(nama, catatan, gambar_url, idKategori)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const updateItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const nama = (request.body as any).nama as string
        const catatan = (request.body as any).catatan as string
        const gambar_url = (request.body as any).gambar_url as string
        const idKategori = (request.body as any).idKategori as number
        const id = (request.params as any).id as string

        if(isNaN(parseInt(id))) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The id must be number" }))
        }

        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "not found" }))
        }
        const resultValidation = createItemValidationSchema.safeParse({ nama, catatan, gambar_url, idKategori })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            // console.log(fmtResultValidation)
            return reply.code(422).send(jsonMetaAndData(422,"error",fmtResultValidation))
        }
        const result = await updateItem(nama, catatan, gambar_url, idKategori, id)
        return reply.code(200).send(jsonMetaAndData(200,'success',result))   
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const allItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const result = await selectAll()
        // console.log(result)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const deleteItemHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const id = (request.params as any).id as string
        if(isNaN(parseInt(id))) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The id must be number" }))
        }
        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The row not found" }))
        }
        const result = await deleteItem(id)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}