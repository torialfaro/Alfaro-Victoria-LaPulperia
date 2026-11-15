import { API_BASE } from './config.js';
import { request } from './api.js';

const API_URL = `${API_BASE}/api/auth`;

export async function login(credenciales) {
  const { data } = await request(`${API_URL}/login`, { method: 'POST', body: credenciales, conToken: false });
  return data;
}

export async function obtenerPerfil() {
  const { data } = await request(`${API_URL}/me`);
  return data;
}

export async function cambiarContrasena(datos) {
  await request(`${API_URL}/contrasena`, { method: 'PATCH', body: datos });
}
