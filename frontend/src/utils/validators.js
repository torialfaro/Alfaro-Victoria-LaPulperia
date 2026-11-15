import { CONTRASENA_CAMPOS, LOGIN_CAMPOS, USUARIO_CAMPOS } from './constants.js';

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAMPOS_CONOCIDOS = [...USUARIO_CAMPOS, ...LOGIN_CAMPOS, ...CONTRASENA_CAMPOS];

const etiqueta = (name) => CAMPOS_CONOCIDOS.find((c) => c.name === name)?.label ?? name;

export function validarCampo(name, valor) {
  const texto = String(valor ?? '').trim();
  if (texto === '') return `El campo "${etiqueta(name)}" es obligatorio.`;
  if (name === 'correo' && !REGEX_CORREO.test(texto)) {
    return 'El correo electrónico no tiene un formato válido.';
  }
  return '';
}

export function validarCampos(campos, valores, { opcionales = [] } = {}) {
  const errores = {};
  for (const { name } of campos) {
    if (opcionales.includes(name) && String(valores[name] ?? '').trim() === '') continue;
    const mensaje = validarCampo(name, valores[name]);
    if (mensaje) errores[name] = mensaje;
  }
  return errores;
}

export function validarCambioContrasena(valores) {
  const errores = validarCampos(CONTRASENA_CAMPOS, valores);
  if (!errores.confirmacion && valores.confirmacion !== valores.contrasenaNueva) {
    errores.confirmacion = 'Las contraseñas no coinciden.';
  }
  return errores;
}

export function erroresDeApi(error) {
  if (error.status === 400 && error.fields?.length) {
    const unico = error.fields.length === 1;
    return Object.fromEntries(error.fields.map((campo) => [campo, unico ? error.message : 'Revisa este campo.']));
  }
  if (error.status === 409) {
    const mensaje = error.message.toLowerCase();
    if (mensaje.includes('usuario')) return { nombreUsuario: error.message };
    if (mensaje.includes('correo')) return { correo: error.message };
  }
  return {};
}
