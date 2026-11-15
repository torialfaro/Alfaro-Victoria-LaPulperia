import { Messages } from '../enums/Messages.js';
import { Roles } from '../enums/Roles.js';
import { BadRequestError, ForbiddenError, UnauthorizedError } from '../exceptions/AppError.js';

export function crearAuthMiddleware(tokenService, usuarioService) {
    function autenticar(req, res, next) {
        const [esquema, token] = (req.headers.authorization ?? '').split(' ');
        if (esquema !== 'Bearer' || !token) throw new UnauthorizedError(Messages.AUTH_REQUIRED);

        const id = tokenService.verificar(token);
        const usuario = id === null ? null : usuarioService.buscarPorId(id);
        if (!usuario) throw new UnauthorizedError(Messages.INVALID_TOKEN);

        req.usuario = usuario;
        next();
    }

    function soloAdmin(req, res, next) {
        if (req.usuario.rol !== Roles.ADMIN) throw new ForbiddenError(Messages.FORBIDDEN);
        next();
    }

    function adminOMismo(req, res, next) {
        if (req.usuario.rol !== Roles.ADMIN && req.usuario.id !== req.params.id) {
            throw new ForbiddenError(Messages.FORBIDDEN);
        }
        next();
    }

    function sinCambioDeContrasenaPropio(req, res, next) {
        if (req.usuario.rol !== Roles.ADMIN && req.body.contrasena !== undefined) {
            throw new BadRequestError(Messages.USE_PASSWORD_CHANGE, ['contrasena']);
        }
        next();
    }

    return { autenticar, soloAdmin, adminOMismo, sinCambioDeContrasenaPropio };
}
