import './Alert.css';

export default function Alert({ type = 'error', children, action }) {
  return (
    <div className={`alert alert--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <p className="alert__text">{children}</p>
      {action}
    </div>
  );
}
