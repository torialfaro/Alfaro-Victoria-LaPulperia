import Usuario from './Usuario.js';

class Cliente extends Usuario {
    constructor(id, nombre, apellido, nombreUsuario, direccion, correo, telefono, contrasena) {
        super(id, nombre, apellido, nombreUsuario, direccion, correo, telefono, contrasena);
        this.misTalleres = [];
        this.misCompras = [];
        this.carrito = [];
    }

    inscribirse(taller) {}

    pagar(compra) {}

    cancelarInscripcion(taller) {}

    cancelarCompra(compra) {}

    agregarCarrito(itemComprable) {}
}

export default Cliente;
