import { FastifyReply, FastifyRequest } from "fastify";
import { createKategoriValidationSchema } from "../schemas/kategori";
import { createKategori, selectWhereId, updateKategori } from "../services/kategori";
import { jsonMetaAndData } from "../utils";

export const createKategoriHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const namaKategori = (request.body as any).namaKategori as string
        const resultValidation = createKategoriValidationSchema.safeParse({ namaKategori })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            console.log(fmtResultValidation)
            return reply.code(422).send(fmtResultValidation)
        }
        const result = await createKategori(namaKategori)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(error)
        console.log(error)
    }
}

export const updateKategoriHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const namaKategori = (request.body as any).namaKategori as string
        const id = (request.params as any).id as string
        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error","not found"))
        }
        const resultValidation = createKategoriValidationSchema.safeParse({ namaKategori })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            console.log(fmtResultValidation)
            return reply.code(422).send(fmtResultValidation)
        }
        const result = await updateKategori(namaKategori, id)
        return reply.code(200).send(jsonMetaAndData(200,'success',result))   
    } catch (error) {
        reply.code(500).send(error)
        console.log(error)
    }
}