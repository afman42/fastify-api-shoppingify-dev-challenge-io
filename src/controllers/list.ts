import { FastifyReply, FastifyRequest } from "fastify";
import { formatDateNowISOString, jsonMetaAndData } from "../utils";
import { createListValidationSchema } from "../schemas/list";
import { createList, selectAll, selectWhereId, updateList } from "../services/list";
import { deleteList } from "../services/list";

export const createListHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const nama_list = (request.body as any).nama_list as string
        const status = (request.body as any).status as 'completed' | 'cancelled'
        const resultValidation = createListValidationSchema.safeParse({ nama_list, status })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            console.log(fmtResultValidation)
            return reply.code(422).send(jsonMetaAndData(422,"error",fmtResultValidation))
        }
        const result = await createList(nama_list, status)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const updateListHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const nama_list = (request.body as any).nama_list as string
        const status = (request.body as any).status as 'completed' | 'cancelled'
        const id = (request.params as any).id as string
        if(isNaN(parseInt(id))) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The id must be number" }))
        }
        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "not found" }))
        }
        const resultValidation = createListValidationSchema.safeParse({ nama_list, status })
        if (!resultValidation.success) {
            const fmtResultValidation = resultValidation.error.format()
            console.log(fmtResultValidation)
            return reply.code(422).send(jsonMetaAndData(422,"error",fmtResultValidation))
        }
        const result = await updateList(nama_list, status , id,formatDateNowISOString())
        return reply.code(200).send(jsonMetaAndData(200,'success',result))   
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const allListHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const result = await selectAll()
        // console.log(result)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}

export const deleteListHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const id = (request.params as any).id as string
        if(isNaN(parseInt(id))) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "The id must be number" }))
        }
        const resultId = await selectWhereId(id)
        if (!resultId) {
            return reply.code(404).send(jsonMetaAndData(404,"error",{ message: "not found" }))
        }
        const result = await deleteList(id)
        return reply.code(200).send(jsonMetaAndData(200,"success",result))
    } catch (error) {
        reply.code(500).send(jsonMetaAndData(500,"error",error))
        console.log(error)
    }
}