import { Messages } from '../enums/Messages.js';
import { BadRequestError } from '../exceptions/AppError.js';

function exigirTextos(body, campos) {
    const datos = body !== null && typeof body === 'object' && !Array.isArray(body) ? body : {};
    const faltantes = campos.filter((campo) => typeof datos[campo] !== 'string' || datos[campo].trim() === '');
    if (faltantes.length > 0) throw new BadRequestError(Messages.MISSING_FIELDS, faltantes);

    return Object.fromEntries(campos.map((campo) => [campo, datos[campo]]));
}

export function validarLogin(req, res, next) {
    req.body = exigirTextos(req.body, ['nombreUsuario', 'contrasena']);
    next();
}

export function validarCambioContrasena(req, res, next) {
    req.body = exigirTextos(req.body, ['contrasenaActual', 'contrasenaNueva']);
    next();
}
