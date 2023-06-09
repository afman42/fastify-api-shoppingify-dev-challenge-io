export const jsonMetaAndData = (statusCode: number, responseStatus: string, data: any) => {
    return {
        meta: {
            statusCode,
            responseStatus
        },
        data
    }
}

export const properties200Object = {
    meta: {
        statusCode: {
          type: "number",
        },
        responseStatus: {
          type: "string"
        }
      },
    data: {
        anyOf:[
            { type: 'array' },
            { type: 'object' }
        ],
        properties: {
            id: {
                type: 'number',
            },
            namaKategori: {
                type: 'string'
            },
            createdAt: {
                type: 'string'
            },
            updatedAt: {
                type: 'string',
            }
        }
          
    }
}