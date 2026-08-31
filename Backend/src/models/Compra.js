class Compra {
    constructor(id, listaItemsComprables, estado, metodoPago, fecha) {
        this.id = id;
        this.listaItemsComprables = listaItemsComprables;
        this.estado = estado;
        this.metodoPago = metodoPago;
        this.fecha = fecha;
    }

    calcularTotal() {}

    cambiarEstado(estado) {}

    procesarPago() {}

    cancelarCompra() {}
}

export default Compra;
