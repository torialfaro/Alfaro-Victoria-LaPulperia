import AppError, { BadRequestError, NotFoundError, InternalServerError } from '../exceptions/AppError.js';
import ApiResponse from '../responses/ApiResponse.js';
import { Messages } from '../enums/Messages.js';
export function notFoundHandler(req, res, next) {
    next(new NotFoundError(Messages.ROUTE_NOT_FOUND));
}
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    if (err instanceof AppError) {
        return ApiResponse.error(res, err);
    }

    if (err?.type === 'entity.parse.failed') {
        return ApiResponse.error(res, new BadRequestError(Messages.INVALID_JSON));
    }

    console.error(Messages.UNHANDLED_ERROR_LOG, err);
    return ApiResponse.error(res, new InternalServerError(Messages.INTERNAL_ERROR));
}
