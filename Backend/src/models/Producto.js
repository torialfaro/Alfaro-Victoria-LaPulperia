class Producto {
    constructor(id, nombre, precioUnitario, stock, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.stock = stock;
        this.descripcion = descripcion;
    }

    getPrecioUnitario() {}

    actualizarStock() {}

    getPrecio() {}

    getNombre() {}
}

export default Producto;
