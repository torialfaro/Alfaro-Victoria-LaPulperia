import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const OCHO_HORAS_MS = 8 * 60 * 60 * 1000;

class TokenService {
    #secreto;
    #duracionMs;

    constructor({ secreto = process.env.AUTH_SECRET ?? randomBytes(32).toString('hex'), duracionMs = OCHO_HORAS_MS } = {}) {
        this.#secreto = secreto;
        this.#duracionMs = duracionMs;
    }

    emitir(usuarioId) {
        const carga = Buffer.from(JSON.stringify({ sub: usuarioId, exp: Date.now() + this.#duracionMs })).toString('base64url');
        return `${carga}.${this.#firmar(carga)}`;
    }

    verificar(token) {
        const [carga, firma] = String(token).split('.');
        if (!carga || !firma) return null;

        const esperada = Buffer.from(this.#firmar(carga));
        const recibida = Buffer.from(firma);
        if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) return null;

        try {
            const { sub, exp } = JSON.parse(Buffer.from(carga, 'base64url').toString('utf8'));
            return Number.isInteger(sub) && exp > Date.now() ? sub : null;
        } catch {
            return null;
        }
    }

    #firmar(carga) {
        return createHmac('sha256', this.#secreto).update(carga).digest('base64url');
    }
}

export default TokenService;
