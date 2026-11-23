class InscripcionController {
    constructor(servicio, vista) {
        this.servicio = servicio;
        this.vista = vista;
    }

    async inscribir(req, res) {
        this.vista.creada(res, await this.servicio.inscribir(req.usuario, req.body));
    }

    misInscripciones(req, res) {
        this.vista.listado(res, this.servicio.obtenerDeUsuario(req.usuario));
    }

    cancelar(req, res) {
        this.servicio.cancelar(req.usuario, req.params.id);
        this.vista.cancelada(res);
    }
}

export default InscripcionController;
