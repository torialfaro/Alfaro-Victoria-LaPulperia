import { Messages } from '../enums/Messages.js';
import { BadRequestError } from '../exceptions/AppError.js';
const CAMPOS = [
    'nombre', 'apellido', 'nombreUsuario', 'direccion', 'correo', 'telefono', 'contrasena',
];
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function filtrarCampos(body) {
    if (body === null || typeof body !== 'object' || Array.isArray(body)) return {};

    return Object.fromEntries(
        CAMPOS
            .filter((campo) => body[campo] !== undefined)
            .map((campo) => [campo, body[campo]])
    );
}
function estaVacio(valor) {
    return String(valor).trim() === '';
}

function validarCorreo(correo) {
    if (!REGEX_CORREO.test(correo)) throw new BadRequestError(Messages.INVALID_EMAIL);
}
export function validarId(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) throw new BadRequestError(Messages.INVALID_ID);

    req.params.id = id;
    next();
}

export function validarCreacion(req, res, next) {
    const datos = filtrarCampos(req.body);

    const faltantes = CAMPOS.filter((campo) => datos[campo] === undefined || estaVacio(datos[campo]));
    if (faltantes.length > 0) throw new BadRequestError(Messages.MISSING_FIELDS, faltantes);

    validarCorreo(datos.correo);

    req.body = datos;
    next();
}

export function validarModificacion(req, res, next) {
    const datos = filtrarCampos(req.body);
    const campos = Object.keys(datos);
    if (campos.length === 0) throw new BadRequestError(Messages.NO_DATA_TO_UPDATE);

    const vacios = campos.filter((campo) => estaVacio(datos[campo]));
    if (vacios.length > 0) throw new BadRequestError(Messages.INVALID_DATA, vacios);

    if (datos.correo !== undefined) validarCorreo(datos.correo);

    req.body = datos;
    next();
}
