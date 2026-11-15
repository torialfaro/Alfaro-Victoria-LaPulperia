import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import { usePageTitle } from '../utils/useRouteEffects.js';

export default function NotFound() {
  usePageTitle('Página no encontrada | La Pulpería');

  return (
    <div className="page page-container">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Página no encontrada
        </SectionTitle>
      </div>
      <p className="page__state">La dirección que buscas no existe.</p>
      <div className="page__state">
        <Button to="/">Volver al inicio</Button>
      </div>
    </div>
  );
}
