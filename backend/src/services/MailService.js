import nodemailer from 'nodemailer';

class MailService {
    #transporte;
    #remitente;
    #simulado;

    constructor(env = process.env) {
        this.#simulado = !env.SMTP_HOST;
        this.#remitente = env.MAIL_FROM ?? env.SMTP_USER ?? 'La Pulpería <no-reply@lapulperia.local>';
        this.#transporte = this.#simulado
            ? nodemailer.createTransport({ jsonTransport: true })
            : nodemailer.createTransport({
                  host: env.SMTP_HOST,
                  port: Number(env.SMTP_PORT ?? 587),
                  secure: env.SMTP_SECURE === 'true',
                  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: (env.SMTP_PASS ?? '').replace(/\s+/g, '') } : undefined,
              });
    }

    async enviar({ para, asunto, texto, responderA }) {
        const info = await this.#transporte.sendMail({ from: this.#remitente, to: para, subject: asunto, text: texto, replyTo: responderA });
        if (this.#simulado) console.log(`[mail simulado] para: ${para} | asunto: ${asunto}\n${texto}\n`);
        return info;
    }
}

export default MailService;
