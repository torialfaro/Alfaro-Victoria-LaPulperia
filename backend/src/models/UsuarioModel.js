import Usuario from './Usuario.js';
import { Messages } from '../utils/Messages.js';
import { NotFoundError, ConflictError } from '../errors/AppError.js';

class UsuarioModel {
    #usuarios = [];
    #siguienteId = 1;

    obtenerTodos() {
        return [...this.#usuarios];
    }

    obtenerPorId(id) {
        return this.#buscarPorId(id);
    }

    crear(datos) {
        this.#validarUnicidad(datos);
        const usuario = new Usuario(
            this.#siguienteId++,
            datos.nombre,
            datos.apellido,
            datos.nombreUsuario,
            datos.direccion,
            datos.correo,
            datos.telefono,
            datos.contrasena
        );
        this.#usuarios.push(usuario);
        return usuario;
    }

    modificar(id, datos) {
        const usuario = this.#buscarPorId(id);
        this.#validarUnicidad(datos, id);

        Object.assign(usuario, datos);
        return usuario;
    }

    eliminar(id) {
        const usuario = this.#buscarPorId(id);
        this.#usuarios.splice(this.#usuarios.indexOf(usuario), 1);
    }
    #buscarPorId(id) {
        const usuario = this.#usuarios.find((u) => u.id === id);
        if (!usuario) throw new NotFoundError(Messages.USER_NOT_FOUND);
        return usuario;
    }

    #validarUnicidad({ nombreUsuario, correo }, idActual = null) {
        const otros = this.#usuarios.filter((u) => u.id !== idActual);

        if (otros.some((u) => u.nombreUsuario === nombreUsuario)) {
            throw new ConflictError(Messages.DUPLICATED_USERNAME);
        }
        if (otros.some((u) => u.correo === correo)) {
            throw new ConflictError(Messages.DUPLICATED_EMAIL);
        }
    }
}

export default UsuarioModel;
