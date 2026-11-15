import { tokenStorage } from './tokenStorage.js';

let alNoAutorizado = null;

export function configurarAlNoAutorizado(callback) {
  alNoAutorizado = callback;
}

export class ApiError extends Error {
  constructor(message, { status = 0, fields = [] } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

export async function request(url, { method = 'GET', body, conToken = true } = {}) {
  const token = conToken ? tokenStorage.obtener() : null;
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    if (response.status === 401 && token) alNoAutorizado?.();
    throw new ApiError(payload?.message ?? 'Ocurrió un error inesperado.', {
      status: response.status,
      fields: payload?.errors ?? [],
    });
  }

  return payload;
}
