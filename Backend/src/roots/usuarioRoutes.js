import { Router } from 'express';
import { validarId, validarCreacion, validarModificacion } from '../middlewares/usuarioValidator.js';
export default function crearUsuarioRoutes(controlador, { autenticar, soloAdmin, adminOMismo, sinCambioDeContrasenaPropio }) {
    const router = Router();
    router.get('/', autenticar, soloAdmin, (req, res) => controlador.obtenerTodos(req, res));
    router.get('/:id', validarId, autenticar, adminOMismo, (req, res) => controlador.obtenerPorId(req, res));
    router.post('/', validarCreacion, (req, res) => controlador.crear(req, res));
    router.put('/:id', validarId, autenticar, adminOMismo, validarModificacion, sinCambioDeContrasenaPropio, (req, res) => controlador.modificar(req, res));
    router.patch('/:id', validarId, autenticar, adminOMismo, validarModificacion, sinCambioDeContrasenaPropio, (req, res) => controlador.modificar(req, res));
    router.delete('/:id', validarId, autenticar, adminOMismo, (req, res) => controlador.eliminar(req, res));

    return router;
}
