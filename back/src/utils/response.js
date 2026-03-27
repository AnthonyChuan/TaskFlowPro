export const successResponse = (res, statusCode, message, data = null, meta = null) => {
    const body = { success: true, message }
    if (data) body.data = data
    if (meta) body.meta = meta
    return res.status(statusCode).json(body)
}

export const errorResponse = (res, statusCode, message, errors = null) => {
    const body = { success: false, message }
    if (errors) body.errors = errors
    return res.status(statusCode).json(body)
}