import { API_BASE } from './config.js';
import { request } from './api.js';

const API_URL = `${API_BASE}/api/usuarios`;

export async function listar() {
  const { data } = await request(API_URL);
  return data;
}

export async function obtener(id) {
  const { data } = await request(`${API_URL}/${id}`);
  return data;
}

export async function crear(datos) {
  const { data } = await request(API_URL, { method: 'POST', body: datos });
  return data;
}

export async function modificar(id, datos) {
  const { data } = await request(`${API_URL}/${id}`, { method: 'PATCH', body: datos });
  return data;
}

export async function eliminar(id) {
  await request(`${API_URL}/${id}`, { method: 'DELETE' });
}
