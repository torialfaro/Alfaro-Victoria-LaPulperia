import ApiResponse from '../responses/ApiResponse.js';
import { Messages } from '../enums/Messages.js';

class InscripcionView {
    creada(res, { inscripcion, taller }) {
        return ApiResponse.success(res, this.#presentar(inscripcion, taller), {
            statusCode: 201,
            message: Messages.INSCRIPCION_CREATED,
        });
    }

    listado(res, items) {
        return ApiResponse.success(res, items.map(({ inscripcion, taller }) => this.#presentar(inscripcion, taller)));
    }

    cancelada(res) {
        return ApiResponse.success(res, null, { message: Messages.INSCRIPCION_CANCELLED });
    }

    #presentar(inscripcion, taller) {
        return { id: inscripcion.id, tallerId: inscripcion.tallerId, estado: inscripcion.estado, fecha: inscripcion.fecha, taller };
    }
}

export default InscripcionView;
