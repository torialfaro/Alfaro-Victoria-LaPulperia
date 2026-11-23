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
import { TALLERES_INICIALES } from './seeds/talleresSeed.js';
import TallerRepository from './repositories/TallerRepository.js';
import InscripcionRepository from './repositories/InscripcionRepository.js';
import TallerService from './services/TallerService.js';
import InscripcionService from './services/InscripcionService.js';
import MailService from './services/MailService.js';
import NotificacionInscripcionService from './services/NotificacionInscripcionService.js';
import TallerView from './views/TallerView.js';
import InscripcionView from './views/InscripcionView.js';
import TallerController from './controllers/TallerController.js';
import InscripcionController from './controllers/InscripcionController.js';
import crearTallerRoutes from './roots/tallerRoutes.js';
import crearInscripcionRoutes from './roots/inscripcionRoutes.js';

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

    const tallerRepository = new TallerRepository(TALLERES_INICIALES);
    const inscripcionRepository = new InscripcionRepository();
    const tallerService = new TallerService(tallerRepository, inscripcionRepository, usuarioService);
    const notificaciones = new NotificacionInscripcionService(new MailService());
    const inscripcionService = new InscripcionService(inscripcionRepository, tallerService, notificaciones);
    usuarioService.alEliminar((id) => inscripcionService.cancelarTodasDeUsuario(id));
    const tallerController = new TallerController(tallerService, new TallerView());
    const inscripcionController = new InscripcionController(inscripcionService, new InscripcionView());

    app.use('/api/auth', crearAuthRoutes(authController, auth));
    app.use('/api/usuarios', crearUsuarioRoutes(usuarioController, auth));
    app.use('/api/talleres', crearTallerRoutes(tallerController, auth));
    app.use('/api/inscripciones', crearInscripcionRoutes(inscripcionController, auth));
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
