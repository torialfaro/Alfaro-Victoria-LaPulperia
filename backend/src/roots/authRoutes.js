import { Router } from 'express';
import { validarLogin, validarCambioContrasena } from '../middlewares/authValidator.js';

export default function crearAuthRoutes(controlador, { autenticar }) {
    const router = Router();
    router.post('/login', validarLogin, (req, res) => controlador.login(req, res));
    router.get('/me', autenticar, (req, res) => controlador.perfil(req, res));
    router.patch('/contrasena', autenticar, validarCambioContrasena, (req, res) => controlador.cambiarContrasena(req, res));

    return router;
}
