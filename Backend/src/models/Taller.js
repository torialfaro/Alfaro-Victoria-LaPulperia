class Taller {
    constructor(id, nombre, descripcion, capacidad, profesor, horario, dia, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.capacidad = capacidad;
        this.profesor = profesor;
        this.horario = horario;
        this.dia = dia;
        this.precio = precio;
    }

    cambiarHorario(horario) {}

    cambiarDia(dia) {}

    getPrecio() {}

    getNombre() {}
}

export default Taller;
