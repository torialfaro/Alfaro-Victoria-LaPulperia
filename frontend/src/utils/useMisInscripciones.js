import { useCallback, useEffect, useState } from 'react';
import * as inscripcionService from '../services/inscripcionService.js';
import { useAuth } from './useAuth.js';

export function useMisInscripciones() {
  const { usuario, esAdmin } = useAuth();
  const habilitado = Boolean(usuario) && !esAdmin;
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(habilitado);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    try {
      setInscripciones(await inscripcionService.listarMias());
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (habilitado) recargar();
  }, [habilitado, recargar]);

  const cancelar = useCallback(async (id) => {
    await inscripcionService.cancelar(id);
    setInscripciones((actuales) => actuales.filter((i) => i.id !== id));
  }, []);

  return {
    inscripciones: habilitado ? inscripciones : [],
    cargando: habilitado && cargando,
    error,
    recargar,
    cancelar,
  };
}
