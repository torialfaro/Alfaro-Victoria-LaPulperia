import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import { usePageTitle } from '../utils/useRouteEffects.js';

export default function Inscripcion() {
  usePageTitle('Inscripción | La Pulpería');

  return (
    <div className="page page-container">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Inscripción
        </SectionTitle>
      </div>
      <p className="page__state">Muy pronto vas a poder inscribirte a los talleres desde acá.</p>
      <div className="page__state">
        <Button to="/#talleres">Volver a los talleres</Button>
      </div>
    </div>
  );
}
