import { NODE_ENV } from "../../../config/config.service.js"

export const globalErrorHandling = (error, req, res, next) => {
    const status = error.cause?.status ?? 500
    return res.status(status).json({
        message: status === 500 ? "Internal Server Error" : error.message ?? "Internal Server Error",
        stack: NODE_ENV == "development" ? error.stack : undefined
    })
}

export const ErrorException = ({ message = "Fail", status = 400, extra } = {}) => {
    throw new Error(message, { cause: { status, extra } })
}

export const BadRequestException = ({ message = "Bad Request Exception", extra } = {}) => {
    ErrorException({ message, status: 400, extra })
}

export const UnauthorizedException = ({ message = "Unauthorized Exception", extra } = {}) => {
    ErrorException({ message, status: 401, extra })
}

export const ForbiddenException = ({ message = "Forbidden Exception", extra } = {}) => {
    ErrorException({ message, status: 403, extra })
}

export const NotFoundException = ({ message = "Not Found Exception", extra } = {}) => {
    ErrorException({ message, status: 404, extra })
}

export const ConflictException = ({ message = "Conflict Exception", extra } = {}) => {
    ErrorException({ message, status: 409, extra })
}