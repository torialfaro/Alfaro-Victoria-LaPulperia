import { Messages } from '../enums/Messages.js';
import { Roles } from '../enums/Roles.js';
import { NotFoundError, ConflictError, ForbiddenError } from '../exceptions/AppError.js';
import { hashear } from './PasswordHasher.js';

class UsuarioService {
    constructor(repositorio) {
        this.repositorio = repositorio;
        this.oyentesEliminacion = [];
    }
    alEliminar(oyente) {
        this.oyentesEliminacion.push(oyente);
    }
    obtenerTodos() {
        return this.repositorio.obtenerTodos();
    }
    obtenerPorId(id) {
        return this.#buscarPorId(id);
    }
    buscarPorId(id) {
        return this.repositorio.obtenerPorId(id);
    }
    buscarPorNombreUsuario(nombreUsuario) {
        return this.repositorio.obtenerPorNombreUsuario(nombreUsuario);
    }
    crear(datos) {
        return this.#crearConRol(datos, Roles.CLIENTE);
    }
    asegurarAdministrador(datos) {
        if (this.repositorio.existeConRol(Roles.ADMIN)) return null;
        return this.#crearConRol(datos, Roles.ADMIN);
    }

    modificar(id, datos) {
        this.#buscarPorId(id);
        this.#validarUnicidad(datos, id);
        const cambios = datos.contrasena === undefined ? datos : { ...datos, contrasena: hashear(datos.contrasena) };
        return this.repositorio.actualizar(id, cambios);
    }
    eliminar(id) {
        const usuario = this.#buscarPorId(id);
        if (usuario.rol === Roles.ADMIN) throw new ForbiddenError(Messages.ADMIN_CANNOT_BE_DELETED);
        this.repositorio.eliminar(id);
        this.oyentesEliminacion.forEach((oyente) => oyente(id));
    }
    #crearConRol(datos, rol) {
        this.#validarUnicidad(datos);
        return this.repositorio.crear({ ...datos, contrasena: hashear(datos.contrasena), rol });
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
