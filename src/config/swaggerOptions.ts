import { SwaggerOptions } from "@fastify/swagger";
import { env } from "./env";

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "Test Shoppingify",
      description: "Testing the Fastify Shoppingify API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: `${
      env.HOST.includes("0.0.0.0")
        ?  process.env.CYCLIC_URL && process.env.CYCLIC_URL.split("//")[1]
        : "localhost:3000"
    }`,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      // { name: 'User', description: 'User related end-points' },
      { name: "Kategori", description: "Kategori related end-points" },
      { name: "Item", description: "Item related end-points" },
      { name: "List", description: "List related end-points" },
      { name: "ListItem", description: "List Item related end-points" },
    ],
    definitions: {
      // User: {
      //   type: 'object',
      //   required: ['id', 'email'],
      //   properties: {
      //     id: { type: 'string', format: 'uuid' },
      //     firstName: { type: 'string' },
      //     lastName: { type: 'string' },
      //     email: {type: 'string', format: 'email' }
      //   }
      // },
      createKategoriBodySchema: {
        type: "object",
        required: ["namaKategori"],
        properties: {
          namaKategori: { type: "string" },
        },
        example: {
          namaKategori: "",
        },
      },
      createItemBodySchema: {
        type: "object",
        required: ["nama", "idKategori"],
        properties: {
          nama: {
            type: "string",
          },
          catatan: {
            type: "string",
          },
          gambar_url: {
            type: "string",
          },
          idKategori: {
            type: "number",
          },
        },
        example: {
          nama: "",
          catatan: "",
          gambar_url: "",
          idKategori: 0,
        },
      },
      createListBodySchema: {
        type: "object",
        required: ["nama_list", "status"],
        properties: {
          nama_list: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["completed", "cancelled"],
          },
        },
        example: {
          nama_list: "",
          status: "",
        },
      },
      createListItemBodySchema: {
        type: "object",
        required: ["nama_list", "status"],
        properties: {
          nama_list: {
            type: "string",
          },
          status: {
            type: "string",
            enum: ["completed", "cancelled"],
          },
          items: {
            type: "array",
            required: ["idItem", "jumlah"],
            properties: {
              idItem: {
                type: "number",
              },
              jumlah: {
                type: "number",
              },
            },
          },
        },
        example: {
          nama_list: "",
          status: "",
          items: [
            {
              idItem: 0,
              jumlah: 0,
            },
          ],
        },
      },
    },
    //   securityDefinitions: {
    //     apiKey: {
    //       type: 'apiKey',
    //       name: 'apiKey',
    //       in: 'header'
    //     }
    //   }
  },
};

export default swaggerOptions;
