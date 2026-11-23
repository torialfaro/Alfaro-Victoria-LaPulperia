import { Router } from 'express';

export default function crearTallerRoutes(controlador, { autenticar, soloAdmin }) {
    const router = Router();
    router.get('/', (req, res) => controlador.obtenerTodos(req, res));
    router.get('/:id', (req, res) => controlador.obtenerPorId(req, res));
    router.get('/:id/inscriptos', autenticar, soloAdmin, (req, res) => controlador.obtenerInscriptos(req, res));

    return router;
}
