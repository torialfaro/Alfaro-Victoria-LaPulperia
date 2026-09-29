import { Messages } from '../enums/Messages.js';
import { NotFoundError, ConflictError } from '../exceptions/AppError.js';
class UsuarioService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    obtenerTodos() {
        return this.repositorio.obtenerTodos();
    }
    obtenerPorId(id) {
        return this.#buscarPorId(id);
    }
    crear(datos) {
        this.#validarUnicidad(datos);
        return this.repositorio.crear(datos);
    }

    modificar(id, datos) {
        this.#buscarPorId(id);
        this.#validarUnicidad(datos, id);
        return this.repositorio.actualizar(id, datos);
    }
    eliminar(id) {
        this.#buscarPorId(id);
        this.repositorio.eliminar(id);
    }
    #buscarPorId(id) {
        const usuario = this.repositorio.obtenerPorId(id);
        if (!usuario) throw new NotFoundError(Messages.USER_NOT_FOUND);
        return usuario;
    }
    #validarUnicidad({ nombreUsuario, correo }, idActual = null) {
        const porNombre = nombreUsuario && this.repositorio.obtenerPorNombreUsuario(nombreUsuario);
        if (porNombre && porNombre.id !== idActual) {
            throw new ConflictError(Messages.DUPLICATED_USERNAME);
        }
        const porCorreo = correo && this.repositorio.obtenerPorCorreo(correo);
        if (porCorreo && porCorreo.id !== idActual) {
            throw new ConflictError(Messages.DUPLICATED_EMAIL);
        }
    }
}
export default UsuarioService;
