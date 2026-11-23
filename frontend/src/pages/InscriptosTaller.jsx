import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';
import Spinner from '../components/Spinner.jsx';
import { usePageTitle } from '../utils/useRouteEffects.js';
import { nombreCompleto } from '../utils/formatters.js';
import * as tallerService from '../services/tallerService.js';
import '../components/UsuariosTable.css';
import '../components/CupoBarra.css';

export default function InscriptosTaller() {
  const { tallerId } = useParams();
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  usePageTitle(`Inscriptos${datos ? ` - ${datos.taller.nombre}` : ''} | La Pulpería`);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      setDatos(await tallerService.listarInscriptos(tallerId));
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, [tallerId]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const { taller, inscriptos } = datos ?? {};
  const porcentaje = taller ? Math.round((taller.inscriptos / taller.capacidad) * 100) : 0;

  return (
    <div className="page page--wide">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          {taller ? `Inscriptos - ${taller.nombre}` : 'Inscriptos'}
        </SectionTitle>
        <Button variant="outline" to="/#talleres">
          Volver a los talleres
        </Button>
      </div>

      <div aria-busy={cargando}>
        {cargando && (
          <div className="page__state">
            <Spinner />
          </div>
        )}
        {!cargando && error && (
          <Alert
            action={
              <Button variant="outline" size="sm" onClick={cargar}>
                Reintentar
              </Button>
            }
          >
            {error}
          </Alert>
        )}
        {!cargando && !error && taller && (
          <div className="page__stack">
            <div className="cupo-barra">
              <div
                className={`cupo-barra__pista${porcentaje >= 100 ? ' cupo-barra__pista--llena' : ''}`}
                role="progressbar"
                aria-label="Cupos ocupados"
                aria-valuemin={0}
                aria-valuemax={taller.capacidad}
                aria-valuenow={taller.inscriptos}
              >
                <div className="cupo-barra__relleno" style={{ width: `${porcentaje}%` }} />
              </div>
              <p className="cupo-barra__texto">
                {taller.inscriptos} de {taller.capacidad} cupos ocupados
                {taller.cuposDisponibles === 0 ? ' (completo)' : ` · ${taller.cuposDisponibles} disponibles`}
              </p>
            </div>

            {inscriptos.length === 0 ? (
              <p className="page__state">Todavía no hay clientes inscriptos en este taller.</p>
            ) : (
              <div className="usuarios-table__wrapper" role="region" aria-label="Listado de inscriptos" tabIndex={0}>
                <table className="usuarios-table">
                  <caption className="visually-hidden">Inscriptos en {taller.nombre}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Teléfono</th>
                      <th scope="col">Comentarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscriptos.map(({ inscripcionId, usuario, comentarios }) => (
                      <tr key={inscripcionId}>
                        <th scope="row">{nombreCompleto(usuario)}</th>
                        <td>{usuario.correo}</td>
                        <td>{usuario.telefono}</td>
                        <td>{comentarios || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
