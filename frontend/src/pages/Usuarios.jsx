import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';
import Spinner from '../components/Spinner.jsx';
import UsuariosTable from '../components/UsuariosTable.jsx';
import UsuarioForm from '../components/UsuarioForm.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useUsuarios } from '../utils/useUsuarios.js';
import { useAuth } from '../utils/useAuth.js';
import { useToast } from '../utils/useToast.js';
import { usePageTitle } from '../utils/useRouteEffects.js';
import { nombreCompleto } from '../utils/formatters.js';

export default function Usuarios() {
  usePageTitle('Usuarios | La Pulpería');
  const toast = useToast();
  const { usuario: sesion, recargarPerfil } = useAuth();
  const { usuarios, cargando, error, cargar, crear, modificar, eliminar } = useUsuarios();
  const [formulario, setFormulario] = useState({ abierto: false, usuario: null });
  const [porEliminar, setPorEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const guardar = async (datos) => {
    if (!formulario.usuario) return crear(datos);
    await modificar(formulario.usuario.id, datos);
    if (formulario.usuario.id === sesion.id) await recargarPerfil();
  };

  const confirmarEliminacion = async () => {
    setEliminando(true);
    try {
      await eliminar(porEliminar.id);
      setPorEliminar(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="page page-container">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Usuarios
        </SectionTitle>
        <Button onClick={() => setFormulario({ abierto: true, usuario: null })}>Nuevo usuario</Button>
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
        {!cargando && !error && usuarios.length === 0 && (
          <p className="page__state">Aún no hay usuarios registrados. Crea el primero con “Nuevo usuario”.</p>
        )}
        {!cargando && !error && usuarios.length > 0 && (
          <UsuariosTable
            usuarios={usuarios}
            onEdit={(usuario) => setFormulario({ abierto: true, usuario })}
            onDelete={setPorEliminar}
          />
        )}
      </div>

      <UsuarioForm
        open={formulario.abierto}
        usuario={formulario.usuario}
        onSubmit={guardar}
        onClose={() => setFormulario((actual) => ({ ...actual, abierto: false }))}
      />

      <ConfirmDialog
        open={porEliminar !== null}
        title="Eliminar usuario"
        message={
          porEliminar
            ? `¿Seguro que quieres eliminar a ${nombreCompleto(porEliminar)}? Esta acción no se puede deshacer.`
            : ''
        }
        loading={eliminando}
        onConfirm={confirmarEliminacion}
        onCancel={() => setPorEliminar(null)}
      />
    </div>
  );
}
