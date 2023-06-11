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

export const formatDateNowISOString = () => {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta"}))
}