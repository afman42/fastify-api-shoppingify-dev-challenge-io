import fastify from "fastify"
import { itemsRoutes, kategorisRoutes, listsRoutes } from "./routes"
import { swaggerOptions } from "./config"

const buildServer = () => {
    const server = fastify()
    server.register(import("@fastify/cors"),{ origin: true })
    server.register(import("@fastify/swagger"), swaggerOptions)
    server.register(import("@fastify/swagger-ui"),{
        routePrefix: '/docs',
        uiConfig: {
          docExpansion: 'list',
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

    // server.register(routeUser, { prefix: "/api/user" })
    server.register(kategorisRoutes, { prefix: "/api/kategori"})
    server.register(itemsRoutes, { prefix: "/api/item"})
    server.register(listsRoutes, { prefix: "/api/list"})

    return server
}

export default buildServer