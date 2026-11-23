import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Inscripcion from '../models/Inscripcion.js';
import { EstadoInscripcion } from '../enums/ReglasTaller.js';

const RUTA_POR_DEFECTO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data/inscripciones.json');

class InscripcionRepository {
    #inscripciones = [];
    #siguienteId = 1;
    #ruta;

    constructor(ruta = process.env.INSCRIPCIONES_DB_PATH ?? RUTA_POR_DEFECTO) {
        this.#ruta = ruta;
        this.#cargar();
    }

    obtenerPorId(id) {
        return this.#inscripciones.find((i) => i.id === id) ?? null;
    }

    obtenerActivasPorTaller(tallerId) {
        return this.#inscripciones.filter((i) => i.tallerId === tallerId && i.estado === EstadoInscripcion.ACTIVA);
    }

    obtenerActivasPorUsuario(usuarioId) {
        return this.#inscripciones.filter((i) => i.usuarioId === usuarioId && i.estado === EstadoInscripcion.ACTIVA);
    }

    obtenerActiva(usuarioId, tallerId) {
        return (
            this.#inscripciones.find(
                (i) => i.usuarioId === usuarioId && i.tallerId === tallerId && i.estado === EstadoInscripcion.ACTIVA
            ) ?? null
        );
    }

    contarActivas(tallerId) {
        return this.obtenerActivasPorTaller(tallerId).length;
    }

    crear({ usuarioId, tallerId, comentarios }) {
        const inscripcion = new Inscripcion(this.#siguienteId++, usuarioId, tallerId, comentarios);
        this.#inscripciones.push(inscripcion);
        this.#guardar();
        return inscripcion;
    }

    cancelar(id) {
        const inscripcion = this.obtenerPorId(id);
        if (!inscripcion) return null;

        inscripcion.estado = EstadoInscripcion.CANCELADA;
        this.#guardar();
        return inscripcion;
    }

    cancelarTodasDeUsuario(usuarioId) {
        const activas = this.obtenerActivasPorUsuario(usuarioId);
        activas.forEach((i) => {
            i.estado = EstadoInscripcion.CANCELADA;
        });
        if (activas.length > 0) this.#guardar();
    }

    #cargar() {
        if (!fs.existsSync(this.#ruta)) return;

        const { siguienteId, inscripciones } = JSON.parse(fs.readFileSync(this.#ruta, 'utf8'));
        this.#inscripciones = inscripciones.map(
            (i) => new Inscripcion(i.id, i.usuarioId, i.tallerId, i.comentarios, i.estado, i.fecha)
        );
        this.#siguienteId = siguienteId;
    }

    #guardar() {
        fs.mkdirSync(path.dirname(this.#ruta), { recursive: true });
        const temporal = `${this.#ruta}.tmp`;
        fs.writeFileSync(
            temporal,
            JSON.stringify({ siguienteId: this.#siguienteId, inscripciones: this.#inscripciones }, null, 2)
        );
        fs.renameSync(temporal, this.#ruta);
    }
}

export default InscripcionRepository;
