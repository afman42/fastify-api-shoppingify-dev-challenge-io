import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { propertiesJsonMetaAndData } from "../utils";
import { FastifySchema } from "fastify";

export const createListItemBodySchema = z.object({
  nama_list: z.string(),
  status: z.string(),
  items: z
    .object({
      idItem: z.number(),
      jumlah: z.number(),
    })
    .array(),
});

export const createListItemValidationSchema = z.object({
  nama_list: z
    .string({ required_error: "The Nama List must be string" })
    .min(1, { message: "The Nama List is required" }),
  status: z.enum(["completed", "cancelled"]),
  items: z
    .object({
      idItem: z.number().min(1, { message: "The itemId min 1 character" }),
      jumlah: z.number().min(1, { message: "The Jumlah min 1 character" }),
    })
    .array()
    .optional(),
});

export type CreateListItemBody = z.infer<typeof createListItemBodySchema>;

let responseData200Array = {
  type: "array",
  properties: {
    id: {
      type: "number",
    },
    nama_list: {
      type: "string",
    },
    status: {
      type: "string",
      enum: ["completed", "cancelled"],
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
  },
};

let responseData200Oject = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    nama_list: {
      type: "string",
    },
    status: {
      type: "string",
      enum: ["completed", "cancelled"],
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
  nama_list: {
    _errors: {
      type: "array",
    },
  },
  status: {
    _errors: {
      type: "array",
    },
  },
};

export const properties200ResponseOject = {
  200: {
    description: "Returns List model",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData200Oject),
    },
  },
};

export const properties200ResponseArray = {
  200: {
    description: "Returns List model",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData200Array),
    },
  },
};

export const properties422Response = {
  422: {
    description: "List Validation",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData422),
    },
  },
};

export const properties404Response = {
  404: {
    description: "List Not Found",
    type: "object",
    properties: {
      ...propertiesJsonMetaAndData(responseData404),
    },
  },
};

// export const responseSchema = {
//   response: {
//     ...properties200Response,
//     ...properties422Response
//   }
// }

export const createListItemJsonSchema: FastifySchema = {
  summary: "Returns a list item",
  description: "Returns a list when create list item",
  tags: ["ListItem"],
  body: zodToJsonSchema(createListItemBodySchema, "createListItemBodySchema"),
  response: {
    //   ...properties200ResponseOject,
    ...properties422Response,
  },
};

export const selectIdListItemJsonSchema: FastifySchema = {
  summary: "Returns one list item",
  description: "Returns one list item",
  tags: ["ListItem"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "id list",
      },
    },
  },
  response: {
    // ...properties200ResponseArray,
  },
};

export const allListItemJsonSchema: FastifySchema = {
  summary: "Returns all list item",
  description: "Returns all list item",
  tags: ["ListItem"],
  response: {
    // ...properties200ResponseArray,
  },
};

export const deleteListItemJsonSchema: FastifySchema = {
  summary: "Delete a list item",
  description: "Delete a list item",
  tags: ["ListItem"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "id list",
      },
    },
  },
  response: {
    //...properties200ResponseOject,
    ...properties404Response,
  },
};
