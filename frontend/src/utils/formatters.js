import { ROL_ADMIN } from './constants.js';

export const nombreCompleto = ({ nombre, apellido }) => `${nombre} ${apellido}`.trim();

export const etiquetaRol = (rol) => (rol === ROL_ADMIN ? 'Administrador' : 'Cliente');
