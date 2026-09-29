class UsuarioController {
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

    crear(req, res) {
        this.vista.creado(res, this.servicio.crear(req.body));
    }

    modificar(req, res) {
        this.vista.modificado(res, this.servicio.modificar(req.params.id, req.body));
    }

    eliminar(req, res) {
        this.servicio.eliminar(req.params.id);
        this.vista.eliminado(res);
    }
}

export default UsuarioController;
