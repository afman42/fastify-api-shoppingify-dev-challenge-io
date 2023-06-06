import { SwaggerOptions } from "@fastify/swagger";

const swaggerOptions: SwaggerOptions = {
    swagger: {
      info: {
        title: 'Test Shoppingify',
        description: 'Testing the Fastify Shoppingify API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'User', description: 'User related end-points' },
        // { name: 'code', description: 'Code related end-points' }
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: {type: 'string', format: 'email' }
          }
        }
      },
    //   securityDefinitions: {
    //     apiKey: {
    //       type: 'apiKey',
    //       name: 'apiKey',
    //       in: 'header'
    //     }
    //   }
    }
}

export default swaggerOptions