import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import MisTalleres from '../components/MisTalleres.jsx';
import TalleresAdmin from '../components/TalleresAdmin.jsx';
import ConfiguracionPerfil from '../components/ConfiguracionPerfil.jsx';
import { useAuth } from '../utils/useAuth.js';
import { usePageTitle } from '../utils/useRouteEffects.js';

export default function Perfil() {
  usePageTitle('Mi perfil | La Pulpería');
  const { esAdmin } = useAuth();
  const [configurando, setConfigurando] = useState(false);

  return (
    <div className="page page--wide">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          {configurando ? 'Configuración' : 'Mi perfil'}
        </SectionTitle>
        <div className="page__actions">
          {esAdmin && !configurando && <Button to="/usuarios">Ver todos los usuarios</Button>}
          {configurando ? (
            <Button variant="outline" onClick={() => setConfigurando(false)}>
              Volver
            </Button>
          ) : (
            <Button
              variant="outline"
              className="btn--icon"
              aria-label="Configuración"
              title="Configuración"
              onClick={() => setConfigurando(true)}
            >
              <Icon name="settings" size={26} />
            </Button>
          )}
        </div>
      </div>

      {configurando && <ConfiguracionPerfil />}
      {!configurando && esAdmin && <TalleresAdmin />}
      {!configurando && !esAdmin && <MisTalleres />}
    </div>
  );
}
