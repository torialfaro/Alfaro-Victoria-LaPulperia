import SectionTitle from './SectionTitle.jsx';
import TallerCard from './TallerCard.jsx';
import EstadoCarga from './EstadoCarga.jsx';
import { TALLERES_SECCION } from '../utils/contenido.js';
import { useMisInscripciones } from '../utils/useMisInscripciones.js';
import { useTalleres } from '../utils/useTalleres.js';
import './TalleresSection.css';

export default function TalleresSection() {
  const { inscripciones } = useMisInscripciones();
  const { talleres, cargando, error, recargar } = useTalleres();
  const inscriptos = new Set(inscripciones.map((i) => i.tallerId));

  return (
    <section id="talleres" tabIndex={-1} className="talleres" aria-labelledby="titulo-talleres">
      {cargando || error ? (
        <EstadoCarga cargando={cargando} error={error} onReintentar={recargar} />
      ) : (
        <ul className="talleres__list">
          {talleres.map((taller) => (
            <li key={taller.id}>
              <TallerCard {...taller} textoBoton={TALLERES_SECCION.textoBoton} inscripto={inscriptos.has(taller.id)} />
            </li>
          ))}
        </ul>
      )}
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
