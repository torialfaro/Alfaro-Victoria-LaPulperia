class TallerController {
    constructor(servicio, vista) {
        this.servicio = servicio;
        this.vista = vista;
    }

    obtenerTodos(req, res) {
        this.vista.listado(res, this.servicio.obtenerTodos());
    }

    obtenerPorId(req, res) {
        this.vista.detalle(res, this.servicio.obtenerPorId(req.params.id));
    }

    obtenerInscriptos(req, res) {
        this.vista.inscriptos(res, this.servicio.obtenerInscriptos(req.params.id));
    }
}

export default TallerController;
