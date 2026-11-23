import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';
import Spinner from '../components/Spinner.jsx';
import DatosUsuario from '../components/DatosUsuario.jsx';
import { useAuth } from '../utils/useAuth.js';
import { useToast } from '../utils/useToast.js';
import { usePageTitle } from '../utils/useRouteEffects.js';
import * as tallerService from '../services/tallerService.js';
import * as inscripcionService from '../services/inscripcionService.js';

export default function Inscripcion() {
  usePageTitle('Inscripción | La Pulpería');
  const { tallerId } = useParams();
  const toast = useToast();
  const { usuario, esAdmin } = useAuth();
  const [taller, setTaller] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    let activo = true;
    tallerService
      .obtener(tallerId)
      .then((datos) => activo && setTaller(datos))
      .catch((e) => activo && setError(e.message))
      .finally(() => activo && setCargando(false));
    return () => {
      activo = false;
    };
  }, [tallerId]);

  const enviar = async (evento) => {
    evento.preventDefault();
    setEnviando(true);
    try {
      await inscripcionService.inscribir({ tallerId, comentarios });
      setResultado('exito');
      toast.success('Inscripción enviada. Te enviamos un mail de confirmación.');
    } catch (e) {
      if (e.status === 409 && !e.message.includes('Ya estás')) setResultado('sin-cupos');
      else setError(e.message);
      toast.error(e.message);
    } finally {
      setEnviando(false);
    }
  };

  const volver = (
    <div className="page__state">
      <Button to="/#talleres">Volver a los talleres</Button>
    </div>
  );

  let contenido;
  if (cargando) {
    contenido = (
      <div className="page__state">
        <Spinner />
      </div>
    );
  } else if (esAdmin) {
    contenido = (
      <>
        <Alert>El administrador no puede inscribirse en talleres.</Alert>
        {volver}
      </>
    );
  } else if (resultado === 'exito') {
    contenido = (
      <>
        <Card id="titulo-exito" title="¡Formulario enviado!">
          <p>
            Recibimos tu inscripción a <strong>{taller.nombre}</strong>. Revisá tu correo ({usuario.correo}): te
            enviamos la confirmación con la información de bienvenida.
          </p>
        </Card>
        <div className="form-actions">
          <Button to="/perfil">Ver mis talleres</Button>
          <Button to="/#talleres" variant="outline">
            Volver a los talleres
          </Button>
        </div>
      </>
    );
  } else if (resultado === 'sin-cupos') {
    contenido = (
      <>
        <Card id="titulo-sin-cupos" title="Sin cupos disponibles">
          <p>
            Por el momento no quedan cupos en <strong>{taller.nombre}</strong>. Te enviamos un mail con el detalle.
          </p>
        </Card>
        {volver}
      </>
    );
  } else if (!taller) {
    contenido = (
      <>
        <Alert>{error || 'No se encontró el taller.'}</Alert>
        {volver}
      </>
    );
  } else {
    contenido = (
      <form onSubmit={enviar} className="page__stack">
        <Card id="titulo-taller" title="Taller">
          <dl className="datos-usuario">
            <div className="datos-usuario__fila">
              <dt>Taller</dt>
              <dd>{taller.nombre}</dd>
            </div>
            <div className="datos-usuario__fila">
              <dt>Profesor/a</dt>
              <dd>{taller.profesor}</dd>
            </div>
            <div className="datos-usuario__fila">
              <dt>Horario</dt>
              <dd>{taller.horario}</dd>
            </div>
          </dl>
        </Card>
        <Card id="titulo-tus-datos" title="Tus datos">
          <DatosUsuario usuario={usuario} />
        </Card>
        <Card id="titulo-comentarios" title="Comentarios">
          <label htmlFor="comentarios" className="form-field__label">
            ¿Querés agregar algo? (opcional)
          </label>
          <textarea
            id="comentarios"
            className="form-field__input"
            rows={4}
            maxLength={500}
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </Card>
        {error && <Alert>{error}</Alert>}
        <div className="form-actions">
          <Button type="submit" loading={enviando}>
            Enviar inscripción
          </Button>
          <Button to="/#talleres" variant="outline">
            Cancelar
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="page page-container page--medium">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Inscripción
        </SectionTitle>
      </div>
      {contenido}
    </div>
  );
}
