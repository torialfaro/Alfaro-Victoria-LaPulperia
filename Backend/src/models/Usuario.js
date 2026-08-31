class Usuario {
    constructor(id, nombre, apellido, nombreUsuario, direccion, correo, telefono, contrasena) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
        this.contrasena = contrasena;
    }

    signIn() {}

    login(nombreUsuario, contrasena) {}

    cambiarContrasena(nombreUsuario) {}
}

export default Usuario;
