import Icon from './Icon.jsx';
import './ContactItem.css';

export default function ContactItem({ icono, texto, etiqueta, href }) {
  const contenido = (
    <>
      <Icon name={icono} size={18} />
      <span>
        <span className="visually-hidden">{etiqueta}: </span>
        {texto}
      </span>
    </>
  );

  return (
    <li className="contact-item">
      {href ? (
        <a
          className="contact-item__content"
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {contenido}
        </a>
      ) : (
        <span className="contact-item__content">{contenido}</span>
      )}
    </li>
  );
}
