const CLAVE = 'pulperia.token';

export const tokenStorage = {
  obtener() {
    try {
      return localStorage.getItem(CLAVE);
    } catch {
      return null;
    }
  },
  guardar(token) {
    try {
      localStorage.setItem(CLAVE, token);
    } catch {
    }
  },
  borrar() {
    try {
      localStorage.removeItem(CLAVE);
    } catch {
    }
  },
};
