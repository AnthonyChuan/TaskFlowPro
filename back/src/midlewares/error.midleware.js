import { logger } from "../config/logger.js"
import { errorResponse } from "../utils/response.js"

export const errorHandler = (error, req, res, next) => {
    logger.error(error.message, { stack: error.stack })

    if (error.status) {
        return errorResponse(res, error.status, error.message)
    }
    errorResponse(res, 500, "Error en el servidor")
}