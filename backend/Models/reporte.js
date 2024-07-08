class Reporte {
    constructor(id, tipo, razon, lugar, comentario, fecha, estado, numero_testigo, id_usuario, requerimiento) {
        this.id = id;
        this.tipo = tipo;
        this.razon = razon;
        this.lugar = lugar;
        this.comentario = comentario;
        this.fecha = fecha;
        this.estado = estado;
        this.numero_testigo = numero_testigo;
        this.id_usuario = id_usuario;
        this.requerimiento = requerimiento;
    }
}

export { Reporte };
