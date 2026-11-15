import { useCallback, useEffect, useRef, useState } from 'react';

const MARGEN_PX = 24;
const EVENTOS_USUARIO = ['wheel', 'touchmove', 'keydown'];

export function useSeccionActiva(ids, { activo, porDefecto }) {
  const [seccion, setSeccion] = useState(porDefecto);
  const fijada = useRef(null);
  const clave = ids.join('|');

  const fijar = useCallback((id) => {
    fijada.current = id;
    setSeccion(id);
  }, []);

  useEffect(() => {
    if (!activo) return undefined;

    const calcular = () => {
      if (fijada.current) return;
      const referencia = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + MARGEN_PX;
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const secciones = clave
        .split('|')
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top }))
        .filter(({ top }) => top !== undefined);

      const candidatas = alFinal ? secciones : secciones.filter(({ top }) => top <= referencia);
      const elegida = candidatas.reduce((a, b) => (b.top > a.top ? b : a), { id: porDefecto, top: -Infinity });
      setSeccion(elegida.id);
    };

    const soltar = () => {
      fijada.current = null;
      calcular();
    };

    let pendiente = false;
    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        calcular();
      });
    };

    fijada.current = null;
    calcular();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('resize', alDesplazar);
    EVENTOS_USUARIO.forEach((evento) => window.addEventListener(evento, soltar, { passive: true }));
    return () => {
      window.removeEventListener('scroll', alDesplazar);
      window.removeEventListener('resize', alDesplazar);
      EVENTOS_USUARIO.forEach((evento) => window.removeEventListener(evento, soltar));
    };
  }, [activo, clave, porDefecto]);

  return [seccion, fijar];
}
