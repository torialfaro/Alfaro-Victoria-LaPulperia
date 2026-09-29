import Usuario from '../models/Usuario.js';

class UsuarioRepository {
    #usuarios = [];
    #siguienteId = 1;

    obtenerTodos() {
        return [...this.#usuarios];
    }
    obtenerPorId(id) {
        return this.#usuarios.find((u) => u.id === id) ?? null;
    }

    obtenerPorNombreUsuario(nombreUsuario) {
        return this.#usuarios.find((u) => u.nombreUsuario === nombreUsuario) ?? null;
    }
    obtenerPorCorreo(correo) {
        return this.#usuarios.find((u) => u.correo === correo) ?? null;
    }

    crear(datos) {
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
    actualizar(id, datos) {
        const usuario = this.obtenerPorId(id);
        if (!usuario) return null;

        Object.assign(usuario, datos);
        return usuario;
    }
    eliminar(id) {
        const indice = this.#usuarios.findIndex((u) => u.id === id);
        if (indice === -1) return false;

        this.#usuarios.splice(indice, 1);
        return true;
    }
}

export default UsuarioRepository;
