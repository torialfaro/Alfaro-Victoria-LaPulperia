import { EstadoInscripcion } from '../enums/ReglasTaller.js';

class Inscripcion {
    constructor(id, usuarioId, tallerId, comentarios = '', estado = EstadoInscripcion.ACTIVA, fecha = new Date().toISOString()) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.tallerId = tallerId;
        this.comentarios = comentarios;
        this.estado = estado;
        this.fecha = fecha;
    }
}

export default Inscripcion;
