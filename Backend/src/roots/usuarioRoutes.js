import { Router } from 'express';
import { validarId, validarCreacion, validarModificacion } from '../middlewares/usuarioValidator.js';
export default function crearUsuarioRoutes(controlador) {
    const router = Router();
    router.get('/', (req, res) => controlador.obtenerTodos(req, res));
    router.get('/:id', validarId, (req, res) => controlador.obtenerPorId(req, res));
    router.post('/', validarCreacion, (req, res) => controlador.crear(req, res));
    router.put('/:id', validarId, validarModificacion, (req, res) => controlador.modificar(req, res));
    router.patch('/:id', validarId, validarModificacion, (req, res) => controlador.modificar(req, res));
    router.delete('/:id', validarId, (req, res) => controlador.eliminar(req, res));

    return router;
}
