import SectionTitle from './SectionTitle.jsx';
import TallerCard from './TallerCard.jsx';
import EstadoCarga from './EstadoCarga.jsx';
import { TALLERES_SECCION } from '../utils/contenido.js';
import { useTalleres } from '../utils/useTalleres.js';
import './MisTalleres.css';
import './TalleresSection.css';

export default function TalleresAdmin() {
  const { talleres, cargando, error, recargar } = useTalleres();

  return (
    <section aria-labelledby="titulo-talleres-admin" className="page__stack">
      <SectionTitle id="titulo-talleres-admin" color="wine" className="section-title--sub">
        Talleres
      </SectionTitle>
      <EstadoCarga cargando={cargando} error={error} onReintentar={recargar} />
      {!cargando && !error && (
        <ul className="mis-talleres__list">
          {talleres.map((taller) => (
            <li key={taller.id}>
              <TallerCard {...taller} textoBoton={TALLERES_SECCION.textoBoton} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
