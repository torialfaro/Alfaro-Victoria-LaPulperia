import ApiResponse from '../responses/ApiResponse.js';

class TallerView {
    listado(res, talleres) {
        return ApiResponse.success(res, talleres);
    }

    detalle(res, taller) {
        return ApiResponse.success(res, taller);
    }

    inscriptos(res, { taller, inscriptos }) {
        return ApiResponse.success(res, {
            taller,
            inscriptos: inscriptos.map(({ inscripcion, usuario }) => ({
                inscripcionId: inscripcion.id,
                fecha: inscripcion.fecha,
                comentarios: inscripcion.comentarios,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    correo: usuario.correo,
                    telefono: usuario.telefono,
                },
            })),
        });
    }
}

export default TallerView;
