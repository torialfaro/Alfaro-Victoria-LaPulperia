export const ROL_ADMIN = 'admin';

export const RUTA_INSCRIPCION = '/inscripcion';
export const RUTA_INGRESAR = '/ingresar';

export const MENSAJES = {
  usuarioCreado:'Usuario creado correctamente.',
  usuarioModificado:'Usuario modificado correctamente.',
  usuarioEliminado:'Usuario eliminado correctamente.',
  datosActualizados:'Datos actualizados correctamente.',
  contrasenaActualizada:'Contraseña actualizada correctamente.',
  cuentaEliminada:'Cuenta eliminada correctamente.',
  sesionCerrada:'Cerraste sesión correctamente.',
  sesionExpirada:'Tu sesión expiró. Inicia sesión nuevamente.',
  bienvenida: (nombre) => `¡Bienvenido/a, ${nombre}!`,
};

export const USUARIO_CAMPOS = [
  { name: 'nombre', label: 'Nombre', type: 'text', autoComplete: 'given-name' },
  { name: 'apellido', label: 'Apellido', type: 'text', autoComplete: 'family-name' },
  { name: 'nombreUsuario', label: 'Nombre de usuario', type: 'text', autoComplete: 'username' },
  { name: 'correo', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
  { name: 'telefono', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
  { name: 'direccion', label: 'Dirección', type: 'text', autoComplete: 'street-address' },
  { name: 'contrasena', label: 'Contraseña', type: 'password', autoComplete: 'new-password' },
];

export const USUARIO_VACIO = Object.fromEntries(USUARIO_CAMPOS.map(({ name }) => [name, '']));

export const LOGIN_CAMPOS = [
  { name: 'nombreUsuario', label: 'Nombre de usuario', type: 'text', autoComplete: 'username' },
  { name: 'contrasena', label: 'Contraseña', type: 'password', autoComplete: 'current-password' },
];

export const CONTRASENA_CAMPOS = [
  { name: 'contrasenaActual', label: 'Contraseña actual', type: 'password', autoComplete: 'current-password' },
  { name: 'contrasenaNueva', label: 'Contraseña nueva', type: 'password', autoComplete: 'new-password' },
  { name: 'confirmacion', label: 'Repetir contraseña nueva', type: 'password', autoComplete: 'new-password' },
];

export const CAMPOS_SIN_RECORTAR = ['contrasena', 'contrasenaActual', 'contrasenaNueva', 'confirmacion'];
