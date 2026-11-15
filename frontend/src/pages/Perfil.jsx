import { useEffect, useRef, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import DatosUsuario from '../components/DatosUsuario.jsx';
import UsuarioFormBody from '../components/UsuarioFormBody.jsx';
import CambiarContrasenaForm from '../components/CambiarContrasenaForm.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useAuth } from '../utils/useAuth.js';
import { useToast } from '../utils/useToast.js';
import { usePageTitle } from '../utils/useRouteEffects.js';

export default function Perfil() {
  usePageTitle('Mi perfil | La Pulpería');
  const toast = useToast();
  const { usuario, esAdmin, cerrarSesion, actualizarPerfil, eliminarCuenta } = useAuth();
  const [editando, setEditando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const edicionRef = useRef(null);
  const botonEditarRef = useRef(null);
  const yaEdito = useRef(false);

  useEffect(() => {
    if (editando) {
      yaEdito.current = true;
      edicionRef.current?.querySelector('input')?.focus();
    } else if (yaEdito.current) {
      botonEditarRef.current?.focus();
    }
  }, [editando]);

  const salir = () => cerrarSesion();

  const confirmarEliminacion = async () => {
    setEliminando(true);
    try {
      await eliminarCuenta();
      cerrarSesion({ silencioso: true });
    } catch (error) {
      toast.error(error.message);
      setEliminando(false);
    }
  };

  return (
    <div className="page page-container page--medium">
      <div className="page__header">
        <SectionTitle as="h1" color="wine" className="page__title">
          Mi perfil
        </SectionTitle>
        <Button variant="outline" onClick={salir}>
          Cerrar sesión
        </Button>
      </div>

      <div className="page__stack">
        <Card id="titulo-datos" title="Mis datos">
          {editando ? (
            <div ref={edicionRef}>
              <UsuarioFormBody
                usuario={usuario}
                conContrasena={false}
                textoEnviar="Guardar cambios"
                onSubmit={actualizarPerfil}
                onExito={() => setEditando(false)}
                onCancel={() => setEditando(false)}
              />
            </div>
          ) : (
            <>
              <DatosUsuario usuario={usuario} />
              <div className="form-actions">
                <Button ref={botonEditarRef} onClick={() => setEditando(true)}>
                  Editar datos
                </Button>
              </div>
            </>
          )}
        </Card>

        <Card id="titulo-contrasena" title="Cambiar contraseña">
          <CambiarContrasenaForm />
        </Card>

        {!esAdmin && (
          <Card id="titulo-eliminar" title="Eliminar cuenta">
            <p>Si eliminas tu cuenta se borrarán tus datos y no podrás recuperarlos.</p>
            <div className="form-actions">
              <Button variant="danger" onClick={() => setConfirmando(true)}>
                Eliminar mi cuenta
              </Button>
            </div>
          </Card>
        )}
      </div>

      <ConfirmDialog
        open={confirmando}
        title="Eliminar cuenta"
        message="¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
        loading={eliminando}
        onConfirm={confirmarEliminacion}
        onCancel={() => setConfirmando(false)}
      />
    </div>
  );
}
