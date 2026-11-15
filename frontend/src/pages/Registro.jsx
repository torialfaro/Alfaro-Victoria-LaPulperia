import { Link, Navigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Card from '../components/Card.jsx';
import UsuarioFormBody from '../components/UsuarioFormBody.jsx';
import PageLoader from '../components/PageLoader.jsx';
import { useAuth } from '../utils/useAuth.js';
import { usePageTitle } from '../utils/useRouteEffects.js';

export default function Registro() {
  usePageTitle('Crear cuenta | La Pulpería');
  const { usuario, cargando, registrar } = useAuth();

  if (cargando) return <PageLoader width="page--medium" />;
  if (usuario) return <Navigate to="/perfil" replace />;

  return (
    <div className="page page-container page--medium">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Crear cuenta
        </SectionTitle>
      </div>
      <Card>
        <UsuarioFormBody textoEnviar="Crear cuenta" onSubmit={registrar} />
      </Card>
      <p className="page__link">
        ¿Ya tienes cuenta? <Link to="/ingresar">Iniciar sesión</Link>
      </p>
    </div>
  );
}
