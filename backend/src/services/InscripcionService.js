import { Messages } from '../enums/Messages.js';
import { Roles } from '../enums/Roles.js';
import { EstadoInscripcion, ReglasTaller } from '../enums/ReglasTaller.js';
import { ConflictError, ForbiddenError, NotFoundError } from '../exceptions/AppError.js';

class InscripcionService {
    constructor(repositorio, tallerService, notificaciones) {
        this.repositorio = repositorio;
        this.tallerService = tallerService;
        this.notificaciones = notificaciones;
    }

    async inscribir(usuario, { tallerId, comentarios }) {
        if (usuario.rol === Roles.ADMIN) throw new ForbiddenError(Messages.ADMIN_CANNOT_ENROLL);

        const taller = this.tallerService.buscarOFallar(tallerId);
        if (this.repositorio.obtenerActiva(usuario.id, taller.id)) throw new ConflictError(Messages.ALREADY_ENROLLED);

        // Verificación y registro sin awaits intermedios: evita superar los cupos con solicitudes simultáneas.
        if (this.repositorio.contarActivas(taller.id) >= ReglasTaller.CUPOS_POR_TALLER) {
            await this.notificaciones.notificarSolicitud({ usuario, taller, comentarios });
            await this.notificaciones.notificarSinCupo({ usuario, taller });
            throw new ConflictError(Messages.NO_SLOTS);
        }

        const inscripcion = this.repositorio.crear({ usuarioId: usuario.id, tallerId: taller.id, comentarios });
        await this.notificaciones.notificarSolicitud({ usuario, taller, comentarios });
        await this.notificaciones.notificarConfirmacion({ usuario, taller });
        return { inscripcion, taller: this.tallerService.obtenerPorId(taller.id) };
    }

    obtenerDeUsuario(usuario) {
        return this.repositorio
            .obtenerActivasPorUsuario(usuario.id)
            .map((inscripcion) => ({ inscripcion, taller: this.tallerService.obtenerPorId(inscripcion.tallerId) }));
    }

    cancelar(usuario, id) {
        const inscripcion = this.repositorio.obtenerPorId(id);
        if (!inscripcion || inscripcion.estado !== EstadoInscripcion.ACTIVA) throw new NotFoundError(Messages.INSCRIPCION_NOT_FOUND);
        if (inscripcion.usuarioId !== usuario.id) throw new ForbiddenError(Messages.FORBIDDEN);

        this.repositorio.cancelar(id);
    }

    cancelarTodasDeUsuario(usuarioId) {
        this.repositorio.cancelarTodasDeUsuario(usuarioId);
    }
}

export default InscripcionService;
