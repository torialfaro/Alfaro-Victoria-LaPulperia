import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import TallerCard from './TallerCard.jsx';
import Button from './Button.jsx';
import Alert from './Alert.jsx';
import Spinner from './Spinner.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import { useMisInscripciones } from '../utils/useMisInscripciones.js';
import { useToast } from '../utils/useToast.js';
import { TALLERES } from '../utils/contenido.js';
import './MisTalleres.css';
import './TalleresSection.css';

export default function MisTalleres() {
  const toast = useToast();
  const { inscripciones, cargando, error, recargar, cancelar } = useMisInscripciones();
  const [porCancelar, setPorCancelar] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  const confirmar = async () => {
    setCancelando(true);
    try {
      await cancelar(porCancelar.id);
      toast.success('Inscripción cancelada correctamente.');
      setPorCancelar(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setCancelando(false);
    }
  };

  return (
    <section aria-labelledby="titulo-mis-talleres" className="page__stack">
      <SectionTitle id="titulo-mis-talleres" color="wine" className="section-title--sub">
        Mis talleres
      </SectionTitle>
      {cargando && (
        <div className="page__state">
          <Spinner />
        </div>
      )}
      {!cargando && error && (
        <Alert
          action={
            <Button variant="outline" size="sm" onClick={recargar}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      {!cargando && !error && inscripciones.length === 0 && (
        <>
          <p>Todavía no te inscribiste a ningún taller.</p>
          <div className="form-actions">
            <Button to="/#talleres">Ver talleres</Button>
          </div>
        </>
      )}
      {inscripciones.length > 0 && (
        <ul className="mis-talleres__list">
          {inscripciones.map(({ id, taller }) => {
            const contenido = TALLERES.find((t) => t.id === taller.id);
            return (
              <li key={id}>
                <TallerCard
                  id={taller.id}
                  titulo={contenido?.titulo ?? taller.nombre}
                  horarios={contenido?.horarios ?? taller.horario}
                  docente={contenido?.docente ?? taller.profesor}
                  imagen={contenido?.imagen}
                  alt={contenido?.alt ?? taller.nombre}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    className="taller-card__button"
                    onClick={() => setPorCancelar({ id, taller })}
                  >
                    Cancelar inscripción
                  </Button>
                </TallerCard>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={porCancelar !== null}
        title="Cancelar inscripción"
        message={
          porCancelar
            ? `¿Seguro que querés cancelar tu inscripción a ${porCancelar.taller.nombre}? Se liberará tu cupo.`
            : ''
        }
        confirmLabel="Cancelar inscripción"
        cancelLabel="Volver"
        loading={cancelando}
        onConfirm={confirmar}
        onCancel={() => setPorCancelar(null)}
      />
    </section>
  );
}
