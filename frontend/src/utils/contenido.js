import logo from '../assets/logo.jpg';
import heroFlores from '../assets/descarga (60).jpeg';
import nosotrosFoto from '../assets/descarga (61).jpeg';
import platos from '../assets/plates.jpeg';
import platosTaller from '../assets/platos.jpeg';
import ceramicaFoto from '../assets/pottery painting.jpeg';
import dibujoFoto from '../assets/art a level aesthetic_.jpeg';

export const IMAGENES = {
  logo,
  heroFlores,
  nosotrosFoto,
  platos,
  platosTaller,
  ceramicaFoto,
  dibujoFoto,
};

export const SITIO = {
  nombre: 'LA PULPERÍA',
  lema: 'taller de cerámica, dibujo y pintura.',
  tituloPagina: 'La Pulpería | Taller de cerámica, dibujo y pintura',
  nombreAccesible: 'La Pulpería, taller de cerámica, dibujo y pintura',
};

export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio', to: '/' },
  { id: 'nosotros', label: 'Nosotros', to: '/#nosotros' },
  { id: 'talleres', label: 'Talleres', to: '/#talleres' },
  { id: 'contacto', label: 'Contacto', to: '/#contacto' },
];

export const NAV_CUENTA = {
  ingresar: { id: 'ingresar', label: 'Iniciar sesión', to: '/ingresar' },
  perfil: { id: 'perfil', to: '/perfil', icono: 'user', textoOculto: 'Mi perfil: ' },
};

export const HERO = {
  alt: 'banner',
};

export const ARTE = {
  titulo: 'La importancia del arte en lo cotidiano',
  parrafo:
    'Creemos firmemente que el arte no es un lujo, sino una parte vital de nuestra experiencia diaria que enriquece nuestras vidas, desde el tazón de café que sostenemos por la mañana hasta el cuadro que decora nuestra sala. En nuestro taller, nos dedicamos a integrar la belleza y la creatividad en el día a día, ofreciendo un refugio donde puedes explorar y celebrar tu propia expresión artística, haciendo del arte un pilar fundamental en tu rutina cotidiana.',
  altPlatos: 'platos',
  altLogo: 'logo',
  textoBoton: 'Quiero saber más',
};

export const TALLERES_SECCION = {
  titulo: ['EL', 'TALLER'],
  textoBoton: 'Inscribirme',
};

export const NOSOTROS = {
  titulo: 'NOSOTROS',
  parrafo:
    'Bienvenidos a La Pulpería, un rincón vibrante y acogedor donde la arcilla y el color cobran vida. Naciendo de la pasión por la expresión artesanal, somos un taller de cerámica y arte dedicado a inspirar la creatividad en todas sus formas. En nuestro espacio ofrecemos un ambiente de aprendizaje comunitario donde cada alumno puede explorar su potencial artístico, ya sea modelando su primera pieza de cerámica o dándole pinceladas a un lienzo. Te invitamos a sumergirte en esta experiencia.',
  alt: 'el taller',
  opiniones: [
    { autor: 'Laura Scocozza', estrellas: 5, texto: 'Hermoso lugar para aprender cerámica, pintura y aparte en general 💜…' },
    {
      autor: 'Veri L',
      estrellas: 5,
      texto:
        'Me cambio la vida. Espero cada miércoles para ir. Debbie es una maestra excepcional en lo humano y lo técnico. Muy bien equipado en cuanto a materiales constructivos y de coloracion, e instrumentos para trabajar la arcilla, moldes etc. Podes aprender todas las tecnicas. Buen clima de grupos y la mejor musica de fondo . Super recomiendo.',
    },
  ],
};

export const CONTACTO_TITULO = 'CONTACTANOS';

export const TALLERES = [
  {
    id: 'ceramica-alfareria',
    titulo: 'Taller de Cerámica y Alfarería',
    horarios: 'Lunes y Miércoles 17hs y 19hs',
    docente: 'Profesora Debora Wilkinson',
    imagen: ceramicaFoto,
    alt: 'taller de ceramica',
  },
  {
    id: 'dibujo-pintura',
    titulo: 'Taller de Dibujo y Pintura',
    horarios: 'Jueves 19hs',
    docente: 'Profesor Rafael Artese',
    imagen: dibujoFoto,
    alt: 'taller de dibujo y pintura',
  },
  {
    id: 'ceramica',
    titulo: 'Taller de Cerámica',
    horarios: 'Jueves 10hs y 17hs, Sábado 10hs',
    docente: 'Profesora Edith Pluis',
    imagen: platosTaller,
    alt: 'platos de ceramica',
  },
];

export const CONTACTOS = [
  {
    id: 'whatsapp',
    icono: 'whatsapp',
    texto: '+54 911 4896 3652',
    etiqueta: 'WhatsApp',
    href: 'https://wa.me/5491125592007',
  },
  {
    id: 'correo',
    icono: 'mail',
    texto: 'lapulperia@gmail.com',
    etiqueta: 'Correo electrónico',
    href: 'mailto:alfarofernandezvictoria@gmail.com',
  },
  {
    id: 'instagram',
    icono: 'instagram',
    texto: '@lapulperiataller',
    etiqueta: 'Instagram',
    href: 'https://www.instagram.com/lapulperiataller',
  },
  { id: 'facebook', 
    icono: 'facebook', 
    texto: 'deborawilkinson', 
    etiqueta: 'Facebook',
    href: 'https://www.facebook.com/wilkinsondebora'},
  {
    id: 'ubicacion',
    icono: 'pin',
    texto: 'Virrey Liniers 1607, B1602 Florida',
    etiqueta: 'Ubicación',
    href: 'https://www.google.com/maps/search/?api=1&query=Virrey+Liniers+1607+Florida',
  },
];
