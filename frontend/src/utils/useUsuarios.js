import { useCallback, useEffect, useState } from 'react';
import * as usuarioService from '../services/usuarioService.js';
import { MENSAJES } from './constants.js';
import { useToast } from './useToast.js';
export function useUsuarios() {
  const toast = useToast();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const traerUsuarios = useCallback(async () => {
    try {
      setUsuarios(await usuarioService.listar());
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    } finally {
      setCargando(false);
    }
  }, [toast]);

  useEffect(() => {
    traerUsuarios();
  }, [traerUsuarios]);

  const cargar = useCallback(() => {
    setCargando(true);
    setError('');
    return traerUsuarios();
  }, [traerUsuarios]);

  const crear = useCallback(
    async (datos) => {
      const nuevo = await usuarioService.crear(datos);
      setUsuarios((actuales) => [...actuales, nuevo]);
      toast.success(MENSAJES.usuarioCreado);
    },
    [toast],
  );

  const modificar = useCallback(
    async (id, datos) => {
      const actualizado = await usuarioService.modificar(id, datos);
      setUsuarios((actuales) => actuales.map((u) => (u.id === id ? actualizado : u)));
      toast.success(MENSAJES.usuarioModificado);
    },
    [toast],
  );

  const eliminar = useCallback(
    async (id) => {
      await usuarioService.eliminar(id);
      setUsuarios((actuales) => actuales.filter((u) => u.id !== id));
      toast.success(MENSAJES.usuarioEliminado);
    },
    [toast],
  );

  return { usuarios, cargando, error, cargar, crear, modificar, eliminar };
}
