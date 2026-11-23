import './Card.css';
import SectionTitle from './SectionTitle.jsx';

export default function Card({ title, id, className = '', children }) {
  return (
    <section className={`card ${className}`.trim()} aria-labelledby={title ? id : undefined}>
      {title && (
        <SectionTitle id={id} color="wine" className="section-title--sub card__title">
          {title}
        </SectionTitle>
      )}
      {children}
    </section>
  );
}
