import { useEffect, useRef, useState } from 'react';
import Card from './Card.jsx';
import Button from './Button.jsx';
import DatosUsuario from './DatosUsuario.jsx';
import UsuarioFormBody from './UsuarioFormBody.jsx';
import CambiarContrasenaForm from './CambiarContrasenaForm.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import { useAuth } from '../utils/useAuth.js';
import { useToast } from '../utils/useToast.js';

export default function ConfiguracionPerfil() {
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

      <Card id="titulo-sesion" title="Cerrar sesión">
        <div className="form-actions">
          <Button variant="outline" onClick={() => cerrarSesion()}>
            Cerrar sesión
          </Button>
        </div>
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
