import { logger } from "../config/logger.js"

export const httpLogger = (req, res, next) => {
    const start = Date.now()

    res.on("finish", () => {
        const ms = Date.now() - start
        const level = res.statusCode >= 500 ? "error"
                    : res.statusCode >= 400 ? "warn"
                    : "info"

        logger[level](`${req.method} ${req.url} ${res.statusCode} - ${ms}ms`)
    })

    next()
}