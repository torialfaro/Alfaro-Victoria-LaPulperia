import { Navigate, useLocation } from 'react-router-dom';
import PageLoader from './PageLoader.jsx';
import { useAuth } from '../utils/useAuth.js';

export default function RutaProtegida({ soloAdmin = false, children }) {
  const { usuario, cargando, esAdmin, sesionCerrada } = useAuth();
  const location = useLocation();

  if (cargando) return <PageLoader />;
  if (!usuario) {
    return sesionCerrada ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/ingresar" replace state={{ desde: location.pathname }} />
    );
  }
  if (soloAdmin && !esAdmin) return <Navigate to="/perfil" replace />;
  return children;
}
