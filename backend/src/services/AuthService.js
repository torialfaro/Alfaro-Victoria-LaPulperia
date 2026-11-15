import { Messages } from '../enums/Messages.js';
import { BadRequestError, UnauthorizedError } from '../exceptions/AppError.js';
import { hashear, verificar } from './PasswordHasher.js';

const HASH_FALSO = hashear('contrasena-inexistente');

class AuthService {
    constructor(usuarioService, tokenService) {
        this.usuarioService = usuarioService;
        this.tokenService = tokenService;
    }

    login({ nombreUsuario, contrasena }) {
        const usuario = this.usuarioService.buscarPorNombreUsuario(nombreUsuario);
        const valida = verificar(contrasena, usuario?.contrasena ?? HASH_FALSO);
        if (!usuario || !valida) throw new UnauthorizedError(Messages.INVALID_CREDENTIALS);

        return { token: this.tokenService.emitir(usuario.id), usuario };
    }

    cambiarContrasena(usuario, { contrasenaActual, contrasenaNueva }) {
        if (!verificar(contrasenaActual, usuario.contrasena)) {
            throw new BadRequestError(Messages.WRONG_CURRENT_PASSWORD, ['contrasenaActual']);
        }
        this.usuarioService.modificar(usuario.id, { contrasena: contrasenaNueva });
    }
}

export default AuthService;
