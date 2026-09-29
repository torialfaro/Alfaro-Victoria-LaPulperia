import express from 'express';
import UsuarioRepository from './repositories/UsuarioRepository.js';
import UsuarioService from './services/UsuarioService.js';
import UsuarioView from './views/UsuarioView.js';
import UsuarioController from './controllers/UsuarioController.js';
import crearUsuarioRoutes from './roots/usuarioRoutes.js';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js';

export default function crearApp() {
    const app = express();
    app.use(express.json());
    const usuarioRepository = new UsuarioRepository();
    const usuarioService = new UsuarioService(usuarioRepository);
    const usuarioController = new UsuarioController(usuarioService, new UsuarioView());

    app.use('/api/usuarios', crearUsuarioRoutes(usuarioController));
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
