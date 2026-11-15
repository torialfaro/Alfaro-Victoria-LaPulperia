import { Link, Navigate, useLocation } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Card from '../components/Card.jsx';
import LoginForm from '../components/LoginForm.jsx';
import PageLoader from '../components/PageLoader.jsx';
import { useAuth } from '../utils/useAuth.js';
import { usePageTitle } from '../utils/useRouteEffects.js';

export default function Login() {
  usePageTitle('Iniciar sesión | La Pulpería');
  const { usuario, cargando } = useAuth();
  const { state } = useLocation();

  if (cargando) return <PageLoader width="page--narrow" />;
  if (usuario) return <Navigate to={state?.desde ?? '/perfil'} replace />;

  return (
    <div className="page page-container page--narrow">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Iniciar sesión
        </SectionTitle>
      </div>
      <Card>
        <LoginForm />
      </Card>
      <p className="page__link">
        ¿No tenés cuenta? <Link to="/registro">Crear cuenta</Link>
      </p>
    </div>
  );
}
