import SectionTitle from './SectionTitle.jsx';
import { IMAGENES, NOSOTROS } from '../utils/contenido.js';
import './NosotrosSection.css';

export default function NosotrosSection() {
  return (
    <section id="nosotros" tabIndex={-1} className="nosotros" aria-labelledby="titulo-nosotros">
      <div className="nosotros__media">
        <img className="nosotros__image" src={IMAGENES.nosotrosFoto} alt={NOSOTROS.alt} loading="lazy" />
      </div>
      <div className="nosotros__text">
        <SectionTitle id="titulo-nosotros" color="olive" className="nosotros__title">
          {NOSOTROS.titulo}
        </SectionTitle>
        <p>{NOSOTROS.parrafo}</p>
        <ul className="nosotros__opiniones" aria-label="Opiniones de Google">
          {NOSOTROS.opiniones.map(({ autor, texto, estrellas }) => (
            <li key={autor} className="opinion">
              <p className="opinion__estrellas" aria-label={`${estrellas} de 5 estrellas`}>
                {'★'.repeat(estrellas)}
              </p>
              <p>“{texto}”</p>
              <p className="opinion__autor">{autor} · Google</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
