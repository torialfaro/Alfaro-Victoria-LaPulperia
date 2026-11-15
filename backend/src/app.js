import express from 'express';
import UsuarioRepository from './repositories/UsuarioRepository.js';
import UsuarioService from './services/UsuarioService.js';
import TokenService from './services/TokenService.js';
import AuthService from './services/AuthService.js';
import UsuarioView from './views/UsuarioView.js';
import AuthView from './views/AuthView.js';
import UsuarioController from './controllers/UsuarioController.js';
import AuthController from './controllers/AuthController.js';
import crearUsuarioRoutes from './roots/usuarioRoutes.js';
import crearAuthRoutes from './roots/authRoutes.js';
import { crearAuthMiddleware } from './middlewares/authMiddleware.js';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js';
import { ADMIN_INICIAL } from './seeds/adminSeed.js';

export default function crearApp() {
    const app = express();
    app.use(express.json());
    const usuarioRepository = new UsuarioRepository();
    const usuarioService = new UsuarioService(usuarioRepository);
    usuarioService.asegurarAdministrador(ADMIN_INICIAL);

    const tokenService = new TokenService();
    const authService = new AuthService(usuarioService, tokenService);
    const auth = crearAuthMiddleware(tokenService, usuarioService);
    const usuarioView = new UsuarioView();
    const usuarioController = new UsuarioController(usuarioService, usuarioView);
    const authController = new AuthController(authService, new AuthView(usuarioView));

    app.use('/api/auth', crearAuthRoutes(authController, auth));
    app.use('/api/usuarios', crearUsuarioRoutes(usuarioController, auth));
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
