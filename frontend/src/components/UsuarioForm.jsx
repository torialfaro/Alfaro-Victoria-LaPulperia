import { useId } from 'react';
import Modal from './Modal.jsx';
import UsuarioFormBody from './UsuarioFormBody.jsx';

export default function UsuarioForm({ open, usuario = null, onSubmit, onClose }) {
  const titleId = useId();

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <h2 id={titleId} className="modal__title">
        {usuario ? 'Editar usuario' : 'Nuevo usuario'}
      </h2>
      <UsuarioFormBody
        usuario={usuario}
        textoEnviar={usuario ? 'Guardar cambios' : 'Crear usuario'}
        onSubmit={onSubmit}
        onExito={onClose}
        onCancel={onClose}
      />
    </Modal>
  );
}
