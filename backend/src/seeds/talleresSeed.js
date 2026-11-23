import { ReglasTaller } from '../enums/ReglasTaller.js';

const C = ReglasTaller.CUPOS_POR_TALLER;

// Los ids coinciden con los de las cards del frontend.
export const TALLERES_INICIALES = [
    {
        id: 'ceramica-alfareria',
        nombre: 'Taller de Cerámica y Alfarería',
        descripcion: 'Modelado y alfarería con arcilla.',
        capacidad: C,
        profesor: 'Profesora Debora Wilkinson',
        horario: 'Lunes y Miércoles 17hs y 19hs',
    },
    {
        id: 'dibujo-pintura',
        nombre: 'Taller de Dibujo y Pintura',
        descripcion: 'Dibujo y pintura sobre lienzo.',
        capacidad: C,
        profesor: 'Profesor Rafael Artese',
        horario: 'Jueves 19hs',
    },
    {
        id: 'ceramica',
        nombre: 'Taller de Cerámica',
        descripcion: 'Cerámica para todos los niveles.',
        capacidad: C,
        profesor: 'Profesora Edith Pluis',
        horario: 'Jueves 10hs y 17hs, Sábado 10hs',
    },
];
