import SectionTitle from './SectionTitle.jsx';
import { IMAGENES, NOSOTROS } from '../utils/contenido.js';
import './NosotrosSection.css';

export default function NosotrosSection() {
  return (
    <section id="nosotros" tabIndex={-1} className="nosotros" aria-labelledby="titulo-nosotros">
      <div className="nosotros__text">
        <SectionTitle id="titulo-nosotros" color="olive" className="nosotros__title">
          {NOSOTROS.titulo}
        </SectionTitle>
        <p>{NOSOTROS.parrafo}</p>
      </div>
      <img className="nosotros__image" src={IMAGENES.nosotrosFoto} alt={NOSOTROS.alt} loading="lazy" />
    </section>
  );
}
