export const Messages = Object.freeze({
    USER_NOT_FOUND: 'El usuario no existe.',
    DUPLICATED_USERNAME: 'El nombre de usuario ya está en uso.',
    DUPLICATED_EMAIL: 'El correo electrónico ya está registrado.',

    INVALID_DATA: 'Los datos enviados son inválidos.',
    MISSING_FIELDS: 'Faltan campos obligatorios.',
    INVALID_ID: 'El id debe ser un número entero positivo.',
    INVALID_EMAIL: 'El correo electrónico no tiene un formato válido.',
    NO_DATA_TO_UPDATE: 'No se enviaron datos para modificar.',
    INVALID_JSON: 'El cuerpo de la solicitud no es un JSON válido.',

    INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos.',
    AUTH_REQUIRED: 'Debes iniciar sesión para continuar.',
    INVALID_TOKEN: 'La sesión no es válida o expiró. Inicia sesión nuevamente.',
    FORBIDDEN: 'No tienes permiso para realizar esta acción.',
    ADMIN_CANNOT_BE_DELETED: 'La cuenta de administrador no se puede eliminar.',
    USE_PASSWORD_CHANGE: 'Para cambiar tu contraseña usa la opción "Cambiar contraseña".',
    WRONG_CURRENT_PASSWORD: 'La contraseña actual es incorrecta.',

    LOGIN_OK: 'Sesión iniciada correctamente.',
    PASSWORD_CHANGED: 'Contraseña actualizada correctamente.',

    USER_CREATED: 'Usuario creado correctamente.',
    USER_UPDATED: 'Usuario modificado correctamente.',
    USER_DELETED: 'Usuario eliminado correctamente.',

    SERVER_RUNNING: 'API escuchando en el puerto',

    ROUTE_NOT_FOUND: 'La ruta solicitada no existe.',
    INTERNAL_ERROR: 'Ocurrió un error interno en el servidor.',
    UNHANDLED_ERROR_LOG: 'Error no controlado:',
});
