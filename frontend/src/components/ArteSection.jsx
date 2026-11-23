import SectionTitle from './SectionTitle.jsx';
import { ARTE, IMAGENES } from '../utils/contenido.js';
import './ArteSection.css';

export default function ArteSection() {
  return (
    <section className="arte" aria-labelledby="titulo-arte">
      <div className="arte__text">
        <SectionTitle id="titulo-arte" color="wine" className="arte__title">
          {ARTE.titulo}
        </SectionTitle>
        <p>{ARTE.parrafo}</p>
      </div>
      <div className="arte__media">
        <img src={IMAGENES.platos} alt={ARTE.altPlatos} />
      </div>
      <div className="arte__media">
        <img src={IMAGENES.logo} alt={ARTE.altLogo} />
      </div>
    </section>
  );
}
