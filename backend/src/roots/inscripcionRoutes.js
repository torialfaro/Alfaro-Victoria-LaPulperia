import { Router } from 'express';
import { validarId } from '../middlewares/usuarioValidator.js';
import { validarInscripcion } from '../middlewares/inscripcionValidator.js';

export default function crearInscripcionRoutes(controlador, { autenticar, soloCliente }) {
    const router = Router();
    router.get('/mias', autenticar, soloCliente, (req, res) => controlador.misInscripciones(req, res));
    router.post('/', autenticar, soloCliente, validarInscripcion, (req, res) => controlador.inscribir(req, res));
    router.delete('/:id', validarId, autenticar, soloCliente, (req, res) => controlador.cancelar(req, res));

    return router;
}
