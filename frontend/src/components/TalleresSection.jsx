import SectionTitle from './SectionTitle.jsx';
import TallerCard from './TallerCard.jsx';
import { TALLERES, TALLERES_SECCION } from '../utils/contenido.js';
import './TalleresSection.css';

export default function TalleresSection() {
  return (
    <section id="talleres" tabIndex={-1} className="talleres" aria-labelledby="titulo-talleres">
      <ul className="talleres__list">
        {TALLERES.map(({ id, ...taller }) => (
          <li key={id}>
            <TallerCard {...taller} textoBoton={TALLERES_SECCION.textoBoton} />
          </li>
        ))}
      </ul>
      <SectionTitle id="titulo-talleres" color="olive" className="talleres__title">
        {TALLERES_SECCION.titulo.map((linea, indice) => (
          <span key={linea}>
            {indice > 0 && <br />}
            {linea}
          </span>
        ))}
      </SectionTitle>
    </section>
  );
}
