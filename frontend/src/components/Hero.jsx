import { HERO, IMAGENES, SITIO } from '../utils/contenido.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="titulo-principal">
      <h1 id="titulo-principal" className="visually-hidden">
        {SITIO.nombreAccesible}
      </h1>
      <img className="hero__image" src={IMAGENES.heroFlores} alt={HERO.alt} width="736" height="474" />
    </section>
  );
}
