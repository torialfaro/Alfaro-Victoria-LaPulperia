import ApiResponse from '../responses/ApiResponse.js';
import { Messages } from '../enums/Messages.js';

class AuthView {
    constructor(usuarioView) {
        this.usuarioView = usuarioView;
    }

    sesion(res, { token, usuario }) {
        return ApiResponse.success(res, { token, usuario: this.usuarioView.publico(usuario) }, { message: Messages.LOGIN_OK });
    }

    perfil(res, usuario) {
        return ApiResponse.success(res, this.usuarioView.publico(usuario));
    }

    contrasenaCambiada(res) {
        return ApiResponse.success(res, null, { message: Messages.PASSWORD_CHANGED });
    }
}

export default AuthView;
