import ApiResponse from '../responses/ApiResponse.js';
import { Messages } from '../enums/Messages.js';
class UsuarioView {
    listado(res, usuarios) {
        return ApiResponse.success(res, usuarios.map((u) => this.#sanitizar(u)));
    }

    detalle(res, usuario) {
        return ApiResponse.success(res, this.#sanitizar(usuario));
    }
    creado(res, usuario) {
        return ApiResponse.success(res, this.#sanitizar(usuario), {
            statusCode: 201,
            message: Messages.USER_CREATED,
        });
    }
    modificado(res, usuario) {
        return ApiResponse.success(res, this.#sanitizar(usuario), {
            message: Messages.USER_UPDATED,
        });
    }

    eliminado(res) {
        return ApiResponse.success(res, null, { message: Messages.USER_DELETED });
    }
    #sanitizar(usuario) {
        const { contrasena, ...publico } = usuario;
        return publico;
    }
}

export default UsuarioView;
