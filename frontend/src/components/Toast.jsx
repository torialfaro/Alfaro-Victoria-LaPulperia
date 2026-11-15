import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import './Toast.css';

const DURACION_MS = { success: 5000, info: 5000, error: 9000 };

export default function Toast({ id, type, message, onClose }) {
  const [pausado, setPausado] = useState(false);
  const cerrarRef = useRef(onClose);

  useEffect(() => {
    cerrarRef.current = onClose;
  });

  useEffect(() => {
    if (pausado) return undefined;
    const timer = setTimeout(() => cerrarRef.current(id), DURACION_MS[type]);
    return () => clearTimeout(timer);
  }, [id, type, pausado]);

  return (
    <div
      className={`toast toast--${type}`}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <Icon name={type} size={22} />
      <p className="toast__message">{message}</p>
      <button type="button" className="toast__close" onClick={() => onClose(id)} aria-label="Cerrar notificación">
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}
