import Button from './Button.jsx';
import { useAuth } from '../utils/useAuth.js';
import { RUTA_INGRESAR, RUTA_INSCRIPCION } from '../utils/constants.js';
import './TallerCard.css';

export default function TallerCard({ id, titulo, horarios, docente, imagen, alt, textoBoton, cuposDisponibles, inscripto = false, children }) {
  const { usuario, esAdmin } = useAuth();

  const destino = `${RUTA_INSCRIPCION}/${id}`;
  const rutaCard = usuario ? destino : RUTA_INGRESAR;
  const estado = usuario ? undefined : { desde: destino };

  let boton = null;
  if (children) {
    boton = children;
  } else if (inscripto) {
    boton = (
      <Button size="sm" className="taller-card__button" disabled aria-label={`Ya estás inscripto en ${titulo}`}>
        Inscripto
      </Button>
    );
  } else if (esAdmin) {
    boton = (
      <Button to={`/inscriptos/${id}`} size="sm" className="taller-card__button" aria-label={`Ver inscriptos en ${titulo}`}>
        Inscriptos
      </Button>
    );
  } else {
    boton = (
      <Button
        to={rutaCard}
        state={estado}
        size="sm"
        className="taller-card__button"
        aria-label={`${textoBoton} en ${titulo}`}
      >
        {textoBoton}
      </Button>
    );
  }

  return (
    <article className="taller-card">
      <img className="taller-card__image" src={imagen} alt={alt} loading="lazy" />
      <h3 className="taller-card__title">{titulo}</h3>
      <p className="taller-card__info">{horarios}</p>
      <p className="taller-card__info">{docente}</p>
      {cuposDisponibles !== undefined && (
        <p className="taller-card__info taller-card__cupos">
          {cuposDisponibles > 0 ? `${cuposDisponibles} cupos disponibles` : 'Sin cupos disponibles'}
        </p>
      )}
      {boton}
    </article>
  );
}
