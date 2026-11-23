import { Messages } from '../enums/Messages.js';
import { ReglasTaller } from '../enums/ReglasTaller.js';
import { NotFoundError } from '../exceptions/AppError.js';

class TallerService {
    constructor(tallerRepositorio, inscripcionRepositorio, usuarioService) {
        this.tallerRepositorio = tallerRepositorio;
        this.inscripcionRepositorio = inscripcionRepositorio;
        this.usuarioService = usuarioService;
    }

    obtenerTodos() {
        return this.tallerRepositorio.obtenerTodos().map((t) => this.#conCupos(t));
    }

    obtenerPorId(id) {
        return this.#conCupos(this.buscarOFallar(id));
    }

    buscarOFallar(id) {
        const taller = this.tallerRepositorio.obtenerPorId(id);
        if (!taller) throw new NotFoundError(Messages.TALLER_NOT_FOUND);
        return taller;
    }

    obtenerInscriptos(id) {
        const taller = this.buscarOFallar(id);
        const inscriptos = this.inscripcionRepositorio
            .obtenerActivasPorTaller(taller.id)
            .map((i) => ({ inscripcion: i, usuario: this.usuarioService.buscarPorId(i.usuarioId) }))
            .filter(({ usuario }) => usuario);
        return { taller: this.#conCupos(taller), inscriptos };
    }

    #conCupos(taller) {
        const inscriptos = this.inscripcionRepositorio.contarActivas(taller.id);
        const cupos = ReglasTaller.CUPOS_POR_TALLER;
        return { ...taller, capacidad: cupos, inscriptos, cuposDisponibles: Math.max(cupos - inscriptos, 0) };
    }
}

export default TallerService;
