import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const LONGITUD_CLAVE = 64;

export function hashear(contrasena) {
    const sal = randomBytes(16);
    const clave = scryptSync(String(contrasena), sal, LONGITUD_CLAVE);
    return `scrypt$${sal.toString('hex')}$${clave.toString('hex')}`;
}

export function verificar(contrasena, almacenada) {
    const [algoritmo, salHex, claveHex] = String(almacenada).split('$');
    if (algoritmo !== 'scrypt' || !salHex || !claveHex) return false;

    const esperada = Buffer.from(claveHex, 'hex');
    const calculada = scryptSync(String(contrasena), Buffer.from(salHex, 'hex'), esperada.length);
    return timingSafeEqual(calculada, esperada);
}
