import Taller from '../models/Taller.js';

class TallerRepository {
    #talleres;

    constructor(talleres) {
        this.#talleres = talleres.map(
            (t) => new Taller(t.id, t.nombre, t.descripcion, t.capacidad, t.profesor, t.horario, t.dia, t.precio)
        );
    }

    obtenerTodos() {
        return [...this.#talleres];
    }

    obtenerPorId(id) {
        return this.#talleres.find((t) => t.id === id) ?? null;
    }
}

export default TallerRepository;
