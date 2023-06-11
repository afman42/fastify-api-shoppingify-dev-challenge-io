import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import json_users from '../data/users.json'

type IJsonusers = typeof json_users;

export default async function routeUser (fastify: FastifyInstance) {

  /* findAll
    GET /users/
    returns all the users
  **/
  fastify.route({
    url: '/',
    method: ['GET'],
    // request and response schema
    schema: {
      summary: 'Returns all Users',
      description: 'Returns all the user\'s data',
      tags: ['User'],
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: 'Returns all the users',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                format: 'uuid'
              },
              firstName: {
                type: 'string'
              },
              lastName: {
                type: 'string'
              },
              email: {
                type: 'string',
                format: 'email'
              }
            }
          }
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    // called just before the request handler
    preHandler: async (request, reply) => {
      /*
      TODO: uncomment this to add your custom pre-handler
      reply.code(403).send({
        code: 'FORBIDDEN',
        message: `You have no access to users resource`
      })
      return null
      **/
    },
    // the function that will handle this request
    handler: async (request, reply) => {
      return json_users
    }
  })

  /* findOne
    GET /users/:id/
    returns a user given their ID
  **/
  fastify.route({
    url: '/:id/',
    method: ['GET'],
    // request and response schema
    schema: {
      summary: 'Returns a user',
      description: 'Returns a user, given their ID as path-parameter',
      tags: ['User'],
      // (or query) validates the querystring
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'a User id'
          }
        }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: 'Returns User model',
          type: 'object',
          properties: {
            id: {
              type: 'number',
              format: 'uuid'
            },
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    // the function that will handle this request
    handler: async (request: FastifyRequest<{
      Params: {
        id: string
      }
    }>, reply: FastifyReply) => {
      const { id } = request.params
      const user = json_users.find((item) => item.id === parseInt(id))      // finds the user by their ID

      // does user exists?
      if (!user) {
        reply.code(404).send({
          code: 'USER_NOT_FOUND',
          message: `The user #${id} not found!`
        })
        return null
      }

      // returns the user
      return user
    }
  })

  /* create
    POST /users/
    createS a new user
  **/
  fastify.route({
    url: '/',
    method: ['POST'],
    // request and response schema
    schema: {
      summary: 'Create a new user',
      description: 'Create a new user',
      tags: ['User'],
      // body
      body: {
        type: 'object',
        description: 'Creates a user',
        properties: {
          id: {
            type: 'number',
            format: 'uuid'
          },
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          }
        }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: 'Returns User model',
          type: 'object',
          properties: {
            id: {
              type: 'number',
              format: 'uuid'
            },
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    // called just before the request handler
    preHandler: async (request, reply) => {
      /*
      TODO: uncomment this to add your custom pre-handler
      reply.code(404).send({
        code: 'USER_NOT_FOUND',
        message: `The user #${id} not found!`
      })
      return null
      **/
    },
    // the function that will handle this request
    handler: async (request: FastifyRequest<{
      Body: {
        id: number
      }
    }>, _reply: FastifyReply) => {
      const data = request.body
      
      data.id = json_users[json_users.length - 1].id + 1  // sets new user's id by increasing the lastest one
      json_users.push(data as any)

      return data
    }
  })

  /* update
    PUT /users/:id/
    updates a user given their ID
  **/
  fastify.route({
    url: '/:id/',
    method: ['PUT'],
    // request and response schema
    schema: {
      summary: 'Updates a user',
      description: 'Updates a user, given their ID as path-parameter',
      tags: ['User'],
      // (or query) validates the querystring
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'a User id'
          }
        }
      },
      // body
      body: {
        type: 'object',
        description: 'Updates a user',
        properties: {
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          }
        }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: 'Returns User model',
          type: 'object',
          properties: {
            id: {
              type: 'number',
              format: 'uuid'
            },
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    // called just before the request handler
    preHandler: async (request, reply) => {
      /*
      TODO: uncomment this to add your custom pre-handler
      reply.code(404).send({
        code: 'USER_NOT_FOUND',
        message: `The user #${id} not found!`
      })
      return null
      **/
    },
    // the function that will handle this request
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const id = (request.params as any).id as string
      let user = json_users.find((item) => item.id === parseInt(id))      // finds the user by their ID

      if (!user) {
        reply.code(404).send({
          code: 'USER_NOT_FOUND',
          message: `The user #${id} not found!`
        })
        return null
      }
      type IUser = typeof user;
      // updates the user with the put data
      user = request.body as IUser
      user.id = parseInt(id)
      
      reply.code(200).send(user)
    }
  })

  /* deletes
    DELETE /users/:id/
    deletes a user given their ID
  **/
  fastify.route({
    url: '/:id/',
    method: ['DELETE'],
    // request and response schema
    schema: {
      summary: 'Deletes a user',
      description: 'Deletes a user, given their ID as path-parameter',
      tags: ['User'],
      // (or query) validates the querystring
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'a User id'
          }
        }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: 'Returns User model',
          type: 'object',
          properties: {
            id: {
              type: 'number',
              format: 'uuid'
            },
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    // called just before the request handler
    preHandler: async (request, reply) => {
      /*
      TODO: uncomment this to add your custom pre-handler
      reply.code(404).send({
        code: 'USER_NOT_FOUND',
        message: `The user #${id} not found!`
      })
      return null
      **/
    },
    // the function that will handle this request
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const id = (request.params as any).id as string
      const user = json_users.find((item) => item.id === parseInt(id))      // finds the user by their ID

      if (!user) {
        reply.code(404).send({
          code: 'USER_NOT_FOUND',
          message: `The user #${id} not found!`
        })
        return null
      }

      // deletes the given user
      // json_users = json_users.filter((item) => item.id !== parseInt(id))
      
      // returns the deleted user
      reply.code(200).send(user)
    }
  })
}