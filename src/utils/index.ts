export const jsonMetaAndData = (statusCode: number, responseStatus: string, data: any) => {
    return {
        meta: {
            statusCode,
            responseStatus
        },
        data
    }
}

export const propertiesJsonMetaAndData = (data: any) => {
    return {
        meta: {
            statusCode: {
              type: "number",
            },
            responseStatus: {
              type: "string"
            }
        },
        data
    }
}