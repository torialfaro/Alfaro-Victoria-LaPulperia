import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}
export function useRouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const destino = hash ? document.getElementById(hash.slice(1)) : null;
    if (destino) {
      destino.scrollIntoView();
      destino.focus({ preventScroll: true });
      return;
    }
    window.scrollTo(0, 0);
    document.getElementById('contenido')?.focus({ preventScroll: true });
  }, [pathname, hash]);
}
