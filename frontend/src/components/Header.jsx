import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { NAV_CUENTA, NAV_LINKS, SITIO } from '../utils/contenido.js';
import { useAuth } from '../utils/useAuth.js';
import { useSeccionActiva } from '../utils/useSeccionActiva.js';
import './Header.css';

const SECCIONES_HOME = NAV_LINKS.filter(({ id }) => id !== 'inicio').map(({ id }) => id);

export default function Header({ overlay = false }) {
  const { pathname } = useLocation();
  const { usuario, cargando, esAdmin } = useAuth();
  const [desplazado, setDesplazado] = useState(false);
  const enHome = pathname === '/';
  const [seccion, fijarSeccion] = useSeccionActiva(SECCIONES_HOME, { activo: enHome, porDefecto: 'inicio' });

  useEffect(() => {
    if (!overlay) return undefined;
    const alDesplazar = () => setDesplazado(window.scrollY > 8);
    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, [overlay]);

  const esActivo = ({ id, to }) => (enHome ? id === seccion : to === pathname);

  const items = [...NAV_LINKS];
  if (esAdmin) items.push(NAV_CUENTA.usuarios);

  let cuenta = null;
  if (usuario) cuenta = { ...NAV_CUENTA.perfil, label: usuario.nombreUsuario };
  else if (!cargando) cuenta = NAV_CUENTA.ingresar;

  const clases = ['site-header', overlay && 'site-header--overlay', overlay && desplazado && 'site-header--scrolled'];

  const renderEnlace = (item, claseExtra = '') => (
    <Link
      to={item.to}
      className={`site-header__link ${claseExtra}`.trim()}
      onClick={() => enHome && NAV_LINKS.some(({ id }) => id === item.id) && fijarSeccion(item.id)}
      aria-current={esActivo(item) ? (enHome ? 'location' : 'page') : undefined}
    >
      {item.icono ? (
        <>
          <Icon name={item.icono} size={30} />
          <span className="visually-hidden">{`${item.textoOculto}${item.label}`}</span>
        </>
      ) : (
        item.label
      )}
    </Link>
  );

  return (
    <header className={clases.filter(Boolean).join(' ')}>
      <div className="site-header__bar">
        <Link to="/" className="site-header__brand">
          <span className="site-header__name">{SITIO.nombre}</span>
          <span className="site-header__tagline">{SITIO.lema}</span>
        </Link>
        <nav aria-label="Principal">
          <ul className="site-header__nav">
            {items.map((item) => (
              <li key={item.id}>{renderEnlace(item)}</li>
            ))}
            {cuenta && (
              <li key={cuenta.id} className="site-header__account">
                {renderEnlace(cuenta, cuenta.icono ? 'site-header__link--icon' : '')}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
