export class HttpError extends Error {
    constructor(status, name, message, extra) {
        super(message)
        this.status = status
        this.name = name
        this.extra = extra
    }
}

export class UserInputError extends HttpError {
    constructor(message, extra) {
        super(400, 'Bad Request', message, extra)
    }
}

export class AuthenticationError extends HttpError {
    constructor(message, extra) {
        super(401, 'Unauthorized', message, extra)
    }
}

export class ForbiddenError extends HttpError {
    constructor(message, extra) {
        super(403, 'Forbidden', message, extra)
    }
}

export class NotFoundError extends HttpError {
    constructor(message, extra) {
        super(404, 'Not Found', message, extra)
    }
}

export class InternalServerError extends HttpError {
    constructor(message, extra) {
        super(500, 'Internal Server ErInternal Server Errorror', message, extra)
    }
}
