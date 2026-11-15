import Button from './Button.jsx';
import { useAuth } from '../utils/useAuth.js';
import { RUTA_INGRESAR, RUTA_INSCRIPCION } from '../utils/constants.js';
import './TallerCard.css';

export default function TallerCard({ titulo, horarios, docente, imagen, alt, textoBoton }) {
  const { usuario } = useAuth();

  const destino = usuario ? RUTA_INSCRIPCION : RUTA_INGRESAR;
  const estado = usuario ? undefined : { desde: RUTA_INSCRIPCION };

  return (
    <article className="taller-card">
      <img className="taller-card__image" src={imagen} alt={alt} loading="lazy" />
      <h3 className="taller-card__title">{titulo}</h3>
      <p className="taller-card__info">{horarios}</p>
      <p className="taller-card__info">{docente}</p>
      <Button
        to={destino}
        state={estado}
        size="sm"
        className="taller-card__button"
        aria-label={`${textoBoton} en ${titulo}`}
      >
        {textoBoton}
      </Button>
    </article>
  );
}
