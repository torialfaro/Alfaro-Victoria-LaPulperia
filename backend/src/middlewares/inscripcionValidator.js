import { Messages } from '../enums/Messages.js';
import { BadRequestError } from '../exceptions/AppError.js';

const MAX_COMENTARIOS = 500;

export function validarInscripcion(req, res, next) {
    const body = req.body !== null && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};
    const { tallerId, comentarios = '' } = body;

    if (typeof tallerId !== 'string' || tallerId.trim() === '') {
        throw new BadRequestError(Messages.MISSING_FIELDS, ['tallerId']);
    }
    if (typeof comentarios !== 'string' || comentarios.length > MAX_COMENTARIOS) {
        throw new BadRequestError(Messages.INVALID_COMMENTS, ['comentarios']);
    }

    req.body = { tallerId: tallerId.trim(), comentarios: comentarios.trim() };
    next();
}
