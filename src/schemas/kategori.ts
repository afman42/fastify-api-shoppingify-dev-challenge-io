import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema"
import { properties200Object } from "../utils";

export const createKategoriBodySchema = z.object({
    namaKategori: z.string()
})

export const createKategoriValidationSchema = z.object({
    namaKategori: z.string().min(1,{ message: "The Nama Kategori is required"})
})

export type CreateKategoriBody = z.infer<typeof createKategoriBodySchema>

export const responseSchema = {
  response: {
    200: {
      description: 'Returns Kategori model',
      type: 'object',
      properties: {
        ...properties200Object
      }
    },
    422: {
      description: 'Kategori Validation',
      type: 'object',
      properties: {
        _errors: {
          type: 'array'
        },
        namaKategori: {
            _errors: {
                type: "array"
            }
        }
      }
    }
  }
}

export const createKategoriJsonSchema = {
    summary: "Returns a kategori",
    description: 'Returns a user when create kategori',
    tags: ['Kategori'],
    body: zodToJsonSchema(createKategoriBodySchema,"createKategoriBodySchema"),
    ...responseSchema
}

export const updateKategoriJsonSchema = {
  summary: "Returns a kategori",
    description: 'Returns a user when update kategori',
    tags: ['Kategori'],
    body: zodToJsonSchema(createKategoriBodySchema,"createKategoriBodySchema"),
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'id kategori'
        }
      }
    },
    ...responseSchema
}