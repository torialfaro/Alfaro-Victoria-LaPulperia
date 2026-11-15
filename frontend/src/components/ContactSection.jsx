import SectionTitle from './SectionTitle.jsx';
import ContactItem from './ContactItem.jsx';
import { CONTACTOS, CONTACTO_TITULO } from '../utils/contenido.js';
import './ContactSection.css';

export default function ContactSection() {
  return (
    <section id="contacto" tabIndex={-1} className="contact-section" aria-labelledby="titulo-contacto">
      <SectionTitle id="titulo-contacto" color="wine" className="contact-section__title">
        {CONTACTO_TITULO}
      </SectionTitle>
      <ul className="contact-section__list">
        {CONTACTOS.map(({ id, ...datos }) => (
          <ContactItem key={id} {...datos} />
        ))}
      </ul>
    </section>
  );
}
