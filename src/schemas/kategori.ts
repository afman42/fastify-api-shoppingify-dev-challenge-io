import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { propertiesJsonMetaAndData } from "../utils";
import { FastifySchema } from "fastify";
import { responseData200Array as responseData200ArrayItem } from "./item";

export const createKategoriBodySchema = z.object({
  namaKategori: z.string(),
});

export const createKategoriValidationSchema = z.object({
  namaKategori: z.string().min(1, { message: "The Nama Kategori is required" }),
});

export type CreateKategoriBody = z.infer<typeof createKategoriBodySchema>;

let responseData200Array = {
  type: "array",
  properties: {
    id: {
      type: "number",
    },
    namaKategori: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
  },
};

let responseData200WithItemArray = {
  type: "array",
  properties: {
    id: {
      type: "number",
    },
    namaKategori: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
    items: {
      ...responseData200ArrayItem,
    },
  },
};

let responseData200Oject = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    namaKategori: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
  },
};

let responseData404 = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

let responseData422 = {
  _errors: {
    type: "array",
  },
  namaKategori: {
    _errors: {
      type: "array",
    },
  },
};

export const properties200ResponseOject = {
  200: {
    description: "Returns Kategori model",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData200Oject),
    },
    example: {
      meta: {
        statusCode: "number",
        responseStatus: "string",
      },
      data: {
        id: "number",
        namaKategori: "string",
        createdAt: "string",
        updatedAt: "string",
      },
    },
  },
};

export const properties200ResponseArray = {
  200: {
    description: "Returns Kategori model",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData200Array),
    },
    example: {
      meta: {
        statusCode: "number",
        responseStatus: "string",
      },
      data: [
        {
          id: "number",
          namaKategori: "string",
          createdAt: "string",
          updatedAt: "string",
        },
      ],
    },
  },
};

export const properties200ResponseWithItemArray = {
  200: {
    description: "Returns Kategori model",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData200WithItemArray),
    },
    example: {
      meta: {
        statusCode: "number",
        responseStatus: "string",
      },
      data: [
        {
          id: "number",
          namaKategori: "string",
          createdAt: "string",
          updatedAt: "string",
          items: [
            {
              id: "number",
              nama: "string",
              catatan: "string",
              gambar_url: "string",
              idKategori: "number",
              createdAt: "string",
              updatedAt: "string",
            },
          ],
        },
      ],
    },
  },
};

export const properties422Response = {
  422: {
    description: "Kategori Validation",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData422),
    },
    example: {
      meta: {
        statusCode: "number",
        responseStatus: "string",
      },
      data: {
        _error: "array",
        namaKategori: {
          _errors: "array",
        },
      },
    },
  },
};

export const properties404Response = {
  404: {
    description: "Kategori Not Found",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData404),
    },

    example: {
      meta: {
        statusCode: "number",
        responseStatus: "string",
      },
      data: {
        message: "string",
      },
    },
  },
};

// export const responseSchema = {
//   response: {
//     ...properties200Response,
//     ...properties422Response
//   }
// }

export const createKategoriJsonSchema: FastifySchema = {
  summary: "Returns a kategori",
  description: "Returns a kategori when create kategori",
  tags: ["Kategori"],
  body: zodToJsonSchema(createKategoriBodySchema, "createKategoriBodySchema"),
  response: {
    ...properties200ResponseOject,
    ...properties422Response,
  },
};

export const updateKategoriJsonSchema: FastifySchema = {
  summary: "Returns a kategori",
  description: "Returns a kategori when update kategori",
  tags: ["Kategori"],
  body: zodToJsonSchema(createKategoriBodySchema, "createKategoriBodySchema"),
  params: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "id kategori",
      },
    },
  },
  response: {
    ...properties200ResponseOject,
    ...properties422Response,
    ...properties404Response,
  },
};

export const allKategoriJsonSchema: FastifySchema = {
  summary: "Returns all kategori",
  description: "Returns all kategori",
  tags: ["Kategori"],
  response: {
    ...properties200ResponseArray,
  },
};

export const allKategoriWithItemJsonSchema: FastifySchema = {
  summary: "Returns all kategori with item",
  description: "Returns all kategori with item",
  tags: ["Kategori"],
  response: {
    ...properties200ResponseWithItemArray,
  },
};

export const deleteKategoriJsonSchema: FastifySchema = {
  summary: "Delete a kategori",
  description: "Delete a kategori",
  tags: ["Kategori"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "id kategori",
      },
    },
  },
  response: {
    ...properties200ResponseOject,
    ...properties404Response,
  },
};
