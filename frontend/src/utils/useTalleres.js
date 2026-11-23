import { useCallback, useEffect, useState } from 'react';
import * as tallerService from '../services/tallerService.js';
import { TALLERES } from './contenido.js';

// Los datos (nombre, horario, docente, cupos) vienen del backend; solo las imágenes son locales.
const aCard = (taller) => {
  const visual = TALLERES.find((t) => t.id === taller.id);
  return {
    id: taller.id,
    titulo: taller.nombre,
    horarios: taller.horario,
    docente: taller.profesor,
    cuposDisponibles: taller.cuposDisponibles,
    imagen: visual?.imagen,
    alt: visual?.alt ?? taller.nombre,
  };
};

export function useTalleres() {
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    setCargando(true);
    try {
      setTalleres((await tallerService.listar()).map(aCard));
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { talleres, cargando, error, recargar };
}
