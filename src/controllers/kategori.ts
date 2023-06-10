import { FastifyReply, FastifyRequest } from "fastify";
import { createKategoriValidationSchema } from "../schemas/kategori";
import { createKategori, deleteKategori, selectAll, selectWhereId, updateKategori } from "../services/kategori";
import { jsonMetaAndData } from "../utils";

export const createKategoriHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const namaKategori = (request.body as any).namaKategori as string
        const resultValidation = createKategoriValidationSchema.safeParse({ namaKategori })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            console.log(fmtResultValidation)
            return reply.code(422).send(jsonMetaAndData(422,"error",fmtResultValidation))
        }
        const result = await createKategori(namaKategori)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const updateKategoriHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const namaKategori = (request.body as any).namaKategori as string
        const id = (request.params as any).id as string
        if(isNaN(parseInt(id))) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The id must be number" }))
        }
        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "not found" }))
        }
        const resultValidation = createKategoriValidationSchema.safeParse({ namaKategori })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            console.log(fmtResultValidation)
            return reply.code(422).send(jsonMetaAndData(422,"error",fmtResultValidation))
        }
        const result = await updateKategori(namaKategori, id)
        return reply.code(200).send(jsonMetaAndData(200,'success',result))   
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const allKategoriHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const result = await selectAll()
        console.log(result)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const deleteKategoriHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const id = (request.params as any).id as string
        if(isNaN(parseInt(id))) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The id must be number" }))
        }
        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "not found" }))
        }
        const result = await deleteKategori(id)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}