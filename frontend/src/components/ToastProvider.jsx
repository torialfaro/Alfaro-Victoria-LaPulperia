import { useCallback, useMemo, useRef, useState } from 'react';
import Toast from './Toast.jsx';
import { ToastContext } from '../utils/useToast.js';
import './Toast.css';

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const siguienteId = useRef(1);

  const cerrar = useCallback((id) => {
    setToasts((actuales) => actuales.filter((t) => t.id !== id));
  }, []);

  const mostrar = useCallback((type, message) => {
    setToasts((actuales) => [
      ...actuales.filter((t) => !(t.type === type && t.message === message)),
      { id: siguienteId.current++, type, message },
    ]);
  }, []);

  const api = useMemo(
    () => ({
      success: (mensaje) => mostrar('success', mensaje),
      error: (mensaje) => mostrar('error', mensaje),
      info: (mensaje) => mostrar('info', mensaje),
    }),
    [mostrar],
  );

  const renderizar = (tipos) =>
    toasts.filter((t) => tipos.includes(t.type)).map((t) => <Toast key={t.id} {...t} onClose={cerrar} />);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-container">
        <div className="toast-container__region" role="status" aria-live="polite">
          {renderizar(['success', 'info'])}
        </div>
        <div className="toast-container__region" role="alert" aria-live="assertive">
          {renderizar(['error'])}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
