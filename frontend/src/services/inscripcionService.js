import { API_BASE } from './config.js';
import { request } from './api.js';

const API_URL = `${API_BASE}/api/inscripciones`;

export async function inscribir(datos) {
  const { data } = await request(API_URL, { method: 'POST', body: datos });
  return data;
}

export async function listarMias() {
  const { data } = await request(`${API_URL}/mias`);
  return data;
}

export async function cancelar(id) {
  await request(`${API_URL}/${id}`, { method: 'DELETE' });
}
