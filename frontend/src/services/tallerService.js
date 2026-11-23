import { API_BASE } from './config.js';
import { request } from './api.js';

const API_URL = `${API_BASE}/api/talleres`;

export async function listar() {
  const { data } = await request(API_URL, { conToken: false });
  return data;
}

export async function obtener(id) {
  const { data } = await request(`${API_URL}/${encodeURIComponent(id)}`, { conToken: false });
  return data;
}

export async function listarInscriptos(id) {
  const { data } = await request(`${API_URL}/${encodeURIComponent(id)}/inscriptos`);
  return data;
}
