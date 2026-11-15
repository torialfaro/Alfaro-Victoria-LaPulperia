class AuthController {
    constructor(servicio, vista) {
        this.servicio = servicio;
        this.vista = vista;
    }

    login(req, res) {
        this.vista.sesion(res, this.servicio.login(req.body));
    }

    perfil(req, res) {
        this.vista.perfil(res, req.usuario);
    }

    cambiarContrasena(req, res) {
        this.servicio.cambiarContrasena(req.usuario, req.body);
        this.vista.contrasenaCambiada(res);
    }
}

export default AuthController;
