import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const FOCUSABLES =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, labelledBy, describedBy, role = 'dialog', children }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    const disparador = document.activeElement;
    const dialogo = dialogRef.current;
    const previoOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const inicial = dialogo.querySelector('[data-autofocus]') ?? dialogo.querySelector(FOCUSABLES) ?? dialogo;
    inicial.focus();

    const onKeyDown = (evento) => {
      if (evento.key === 'Escape') {
        evento.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (evento.key !== 'Tab') return;

      const elementos = [...dialogo.querySelectorAll(FOCUSABLES)];
      if (elementos.length === 0) {
        evento.preventDefault();
        return;
      }
      const primero = elementos[0];
      const ultimo = elementos[elementos.length - 1];
      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previoOverflow;
      if (disparador instanceof HTMLElement && document.contains(disparador)) disparador.focus();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="modal__overlay" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="modal__dialog"
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
