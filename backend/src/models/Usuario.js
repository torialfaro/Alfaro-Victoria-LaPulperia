import { Roles } from '../enums/Roles.js';

class Usuario {
    constructor(id, nombre, apellido, nombreUsuario, direccion, correo, telefono, contrasena, rol = Roles.CLIENTE) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
        this.contrasena = contrasena;
        this.rol = rol;
    }

    signIn() {}

    login(nombreUsuario, contrasena) {}

    cambiarContrasena(nombreUsuario) {}
}

export default Usuario;
