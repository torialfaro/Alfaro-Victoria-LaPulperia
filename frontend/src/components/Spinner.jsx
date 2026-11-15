import './Spinner.css';

export default function Spinner({ size = 32, label = 'Cargando…' }) {
  return (
    <span className="spinner" role={label ? 'status' : undefined}>
      <span className="spinner__circle" style={{ width: size, height: size }} aria-hidden="true" />
      {label && <span className="visually-hidden">{label}</span>}
    </span>
  );
}
