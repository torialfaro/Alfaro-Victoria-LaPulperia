import { Link } from 'react-router-dom';
import Spinner from './Spinner.jsx';
import './Button.css';

export default function Button({
  variant = 'wine',
  size = 'md',
  loading = false,
  to,
  type = 'button',
  className = '',
  children,
  disabled,
  ...rest
}) {
  const clases = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={clases} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={clases} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <Spinner size={16} label="" />}
      {children}
    </button>
  );
}
