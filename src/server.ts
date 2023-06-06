import fastify from "fastify"
import { routeUser } from "./routes"
import { swaggerOptions } from "./config"

const buildServer = () => {
    const server = fastify()
    server.register(import("@fastify/cors"),{ origin: true })
    server.register(import("@fastify/swagger"), swaggerOptions)
    server.register(import("@fastify/swagger-ui"),{
        routePrefix: '/docs',
        uiConfig: {
          docExpansion: 'full',
          deepLinking: false
        },
        uiHooks: {
          onRequest: function (request, reply, next) { next() },
          preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    })

    server.register(routeUser, { prefix: "/api/user" })

    return server
}

export default buildServer