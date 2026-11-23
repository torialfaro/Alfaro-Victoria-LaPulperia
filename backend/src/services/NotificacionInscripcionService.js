import { ESTUDIO } from '../seeds/estudio.js';

class NotificacionInscripcionService {
    constructor(mailService) {
        this.mailService = mailService;
    }

    async notificarSolicitud({ usuario, taller, comentarios }) {
        await this.#enviar({
            para: ESTUDIO.correoInscripciones,
            responderA: usuario.correo,
            asunto: `Solicitud de inscripción: ${taller.nombre}`,
            texto: [
                'Nueva solicitud de inscripción.',
                '',
                `Taller: ${taller.nombre}`,
                `Profesor/a: ${taller.profesor}`,
                `Horario: ${taller.horario}`,
                '',
                `Alumno/a: ${usuario.nombre} ${usuario.apellido}`,
                `Correo: ${usuario.correo}`,
                `Teléfono: ${usuario.telefono}`,
                `Dirección: ${usuario.direccion}`,
                `Comentarios: ${comentarios || '-'}`,
            ].join('\n'),
        });
    }

    async notificarConfirmacion({ usuario, taller }) {
        await this.#enviar({
            para: usuario.correo,
            asunto: `¡Bienvenido/a a ${taller.nombre}!`,
            texto: [
                `Hola ${usuario.nombre},`,
                '',
                `¡Tu inscripción a ${taller.nombre} fue confirmada! Te damos la bienvenida a ${ESTUDIO.nombre}.`,
                '',
                `Profesor/a: ${taller.profesor}`,
                `Horario: ${taller.horario}`,
                `Dirección: ${ESTUDIO.direccion}`,
                `Teléfono de contacto: ${ESTUDIO.telefono}`,
                '',
                '¡Te esperamos!',
            ].join('\n'),
        });
    }

    async notificarSinCupo({ usuario, taller }) {
        await this.#enviar({
            para: usuario.correo,
            asunto: `Sin cupos disponibles: ${taller.nombre}`,
            texto: [
                `Hola ${usuario.nombre},`,
                '',
                `Lamentablemente en este momento no hay cupos disponibles en ${taller.nombre}, por lo que no pudimos confirmar tu inscripción.`,
                `Si querés consultar por otras opciones, escribinos al ${ESTUDIO.telefono}.`,
                '',
                ESTUDIO.nombre,
            ].join('\n'),
        });
    }

    // Un fallo de mail no debe invalidar la inscripción ya registrada.
    async #enviar(mail) {
        try {
            await this.mailService.enviar(mail);
        } catch (error) {
            console.error('No se pudo enviar el mail:', error.message);
        }
    }
}

export default NotificacionInscripcionService;
