import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema"
import { propertiesJsonMetaAndData } from "../utils";
import { FastifySchema } from "fastify";

export const createListBodySchema = z.object({
    nama_list: z.string(),
    status: z.string()
})

export const createListValidationSchema = z.object({
    nama_list: z.string({ required_error: "The Nama List must be string"}).min(1,{ message: "The Nama List is required"}),
    status: z.enum(["completed","cancelled"]),
})

export type CreateListBody = z.infer<typeof createListBodySchema>

let responseData200Array = {
  type: 'array',
  properties: {
      id: {
          type: 'number',
      },
      nama_list: {
          type: 'string'
      },
      status: {
          type: "string",
          enum: ["completed","cancelled"]
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
      nama_list: {
        type: 'string'
      },
      status: {
        type: "string",
        enum: ["completed","cancelled"]
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
  nama_list: {
      _errors: {
          type: "array"
      }
  },
  status: {
    _errors: {
        type: "array"
    }
  },
}

export const properties200ResponseOject = {
  200: {
    description: 'Returns List model',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData200Oject)
    }
  },
}

export const properties200ResponseArray = {
  200: {
    description: 'Returns List model',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData200Array)
    }
  },
}

export const properties422Response = {
  422: {
    description: 'List Validation',
    type: 'object',
    properties: {
      ...propertiesJsonMetaAndData(responseData422)
    }
  }
}

export const properties404Response = {
  404: {
    description: 'List Not Found',
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

export const createListJsonSchema: FastifySchema = {
    summary: "Returns a list",
    description: 'Returns a list when create list',
    tags: ['List'],
    body: zodToJsonSchema(createListBodySchema,"createListBodySchema"),
    response: {
      ...properties200ResponseOject,
      ...properties422Response
    }
}

export const updateListJsonSchema: FastifySchema = {
  summary: "Returns a list",
    description: 'Returns a list when update list',
    tags: ['List'],
    body: zodToJsonSchema(createListBodySchema,"createListBodySchema"),
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'id list'
        }
      }
    },
    response: {
      ...properties200ResponseOject,
      ...properties422Response,
      ...properties404Response
    }
}

export const allListJsonSchema: FastifySchema = {
  summary: "Returns all kategori",
  description: 'Returns all list',
  tags: ['List'],
  response: {
    ...properties200ResponseArray,
  }
}

export const deleteListJsonSchema: FastifySchema = {
  summary: "Delete a item",
  description: 'Delete a item',
  tags: ['List'],
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