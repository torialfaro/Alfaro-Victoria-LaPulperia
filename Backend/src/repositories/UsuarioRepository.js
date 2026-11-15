import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Usuario from '../models/Usuario.js';

const RUTA_POR_DEFECTO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data/usuarios.json');

class UsuarioRepository {
    #usuarios = [];
    #siguienteId = 1;
    #ruta;

    constructor(ruta = process.env.USUARIOS_DB_PATH ?? RUTA_POR_DEFECTO) {
        this.#ruta = ruta;
        this.#cargar();
    }

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
    existeConRol(rol) {
        return this.#usuarios.some((u) => u.rol === rol);
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
            datos.contrasena,
            datos.rol
        );
        this.#usuarios.push(usuario);
        this.#guardar();
        return usuario;
    }
    actualizar(id, datos) {
        const usuario = this.obtenerPorId(id);
        if (!usuario) return null;

        Object.assign(usuario, datos);
        this.#guardar();
        return usuario;
    }
    eliminar(id) {
        const indice = this.#usuarios.findIndex((u) => u.id === id);
        if (indice === -1) return false;

        this.#usuarios.splice(indice, 1);
        this.#guardar();
        return true;
    }

    #cargar() {
        if (!fs.existsSync(this.#ruta)) return;

        const { siguienteId, usuarios } = JSON.parse(fs.readFileSync(this.#ruta, 'utf8'));
        this.#usuarios = usuarios.map(
            (u) => new Usuario(u.id, u.nombre, u.apellido, u.nombreUsuario, u.direccion, u.correo, u.telefono, u.contrasena, u.rol)
        );
        this.#siguienteId = siguienteId;
    }

    #guardar() {
        fs.mkdirSync(path.dirname(this.#ruta), { recursive: true });
        const temporal = `${this.#ruta}.tmp`;
        fs.writeFileSync(temporal, JSON.stringify({ siguienteId: this.#siguienteId, usuarios: this.#usuarios }, null, 2));
        fs.renameSync(temporal, this.#ruta);
    }
}

export default UsuarioRepository;
