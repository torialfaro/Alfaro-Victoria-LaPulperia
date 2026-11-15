import Hero from '../components/Hero.jsx';
import ArteSection from '../components/ArteSection.jsx';
import TalleresSection from '../components/TalleresSection.jsx';
import NosotrosSection from '../components/NosotrosSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import { usePageTitle } from '../utils/useRouteEffects.js';
import { SITIO } from '../utils/contenido.js';

export default function Home() {
  usePageTitle(SITIO.tituloPagina);

  return (
    <>
      <Hero />
      <ArteSection />
      <TalleresSection />
      <NosotrosSection />
      <ContactSection />
    </>
  );
}
