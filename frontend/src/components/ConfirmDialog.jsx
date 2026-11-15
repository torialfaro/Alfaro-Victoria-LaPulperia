import { useId } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  loading = false,
  onConfirm,
  onCancel,
}) {
  const titleId = useId();
  const messageId = useId();

  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onCancel}
      labelledBy={titleId}
      describedBy={messageId}
      role="alertdialog"
    >
      <h2 id={titleId} className="modal__title">
        {title}
      </h2>
      <p id={messageId}>{message}</p>
      <div className="modal__actions">
        <Button variant="outline" onClick={onCancel} disabled={loading} data-autofocus>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
