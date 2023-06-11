import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema"
import { propertiesJsonMetaAndData } from "../utils";
import { FastifySchema } from "fastify";

export const createItemBodySchema = z.object({
    nama: z.string(),
    catatan: z.string().optional(), 
    gambar_url: z.string().optional(), 
    idKategori: z.number()
})

export const createItemValidationSchema = z.object({
    nama: z.string({ required_error: "The Nama must be string"}).min(1,{ message: "The Nama is required"}),
    catatan: z.string({ required_error: "The Catatan must be string"}).optional(),
    gambar_url: z.string({ required_error: "The Catatan must be string"}).optional(), 
    idKategori: z.number({ required_error: "The Catatan must be number"}).min(1,{ message: "The Id Kategori is required"})
})

export type CreateItemBody = z.infer<typeof createItemBodySchema>

let responseData200Array = {
  type: 'array',
  properties: {
      id: {
          type: 'number',
      },
      nama: {
          type: 'string'
      },
      catatan: {
          type: "string"
      },
      gambar_url: {
          type: "string"
      },
      idKategori: {
          type: "number"
      },
      createdAt: {
          type: 'string'
      },
      updatedAt: {
          type: 'string',
      }
  } 
}

let responseData200Oject = {
  type: 'object',
  properties: {
      id: {
          type: 'number',
      },
      nama: {
        type: 'string'
      },
      catatan: {
        type: "string"
      },
      gambar_url: {
        type: "string"
      },
      idKategori: {
        type: "number"
      },
      createdAt: {
          type: 'string'
      },
      updatedAt: {
          type: 'string',
      }
  } 
}

let responseData404 = {
  type: 'object',
  properties: {
    message: { type: "string"}
  }
}

let responseData422 = {
  _errors: {
    type: 'array'
  },
  nama: {
      _errors: {
          type: "array"
      }
  },
  catatan: {
    _errors: {
        type: "array"
    }
  },
  gambar_url: {
    _errors: {
        type: "array"
    }
  },
  idKategori: {
    _errors: {
        type: "array"
    }
  },
}

export const properties200ResponseOject = {
  200: {
    description: 'Returns Item model',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData200Oject)
    }
  },
}

export const properties200ResponseArray = {
  200: {
    description: 'Returns Item model',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData200Array)
    }
  },
}

export const properties422Response = {
  422: {
    description: 'Item Validation',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData422)
    }
  }
}

export const properties404Response = {
  404: {
    description: 'Item Not Found',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData404)
    }
  }
}

// export const responseSchema = {
//   response: {
//     ...properties200Response,
//     ...properties422Response
//   }
// }

export const createItemJsonSchema: FastifySchema = {
    summary: "Returns a item",
    description: 'Returns a item when create Item',
    tags: ['Item'],
    body: zodToJsonSchema(createItemBodySchema,"createItemBodySchema"),
    response: {
      ...properties200ResponseOject,
      ...properties422Response
    }
}

export const updateItemJsonSchema: FastifySchema = {
  summary: "Returns a item",
    description: 'Returns a item when update Item',
    tags: ['Item'],
    body: zodToJsonSchema(createItemBodySchema,"createItemBodySchema"),
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'id item'
        }
      }
    },
    response: {
      ...properties200ResponseOject,
      ...properties422Response,
      ...properties404Response
    }
}

export const allItemJsonSchema: FastifySchema = {
  summary: "Returns all Item",
  description: 'Returns all Item',
  tags: ['Item'],
  response: {
    ...properties200ResponseArray,
  }
}

export const deleteItemJsonSchema: FastifySchema = {
  summary: "Delete a item",
  description: 'Delete a item',
  tags: ['Item'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'id item'
      }
    }
  },
  response: {
    ...properties200ResponseOject,
    ...properties404Response
  }
}