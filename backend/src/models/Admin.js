import Usuario from './Usuario.js';

class Admin extends Usuario {
    constructor(id, nombre, apellido, nombreUsuario, direccion, correo, telefono, contrasena) {
        super(id, nombre, apellido, nombreUsuario, direccion, correo, telefono, contrasena);
    }

    altaProducto(producto) {}

    bajaProducto(producto) {}

    modifProducto(producto) {}

    altaTaller(taller) {}

    bajaTaller(taller) {}

    modifTaller(taller) {}

    verAlumnos() {}

    publicarNovedad(texto) {}

    actualizarStock(producto) {}
}

export default Admin;
