class ReporteAgente {
    constructor(id, nombre_agente, id_usuario, descripcion, verificado, id_multa, fecha, tipo_reporte, nombre_usuario, apellido_usuario) {
        this.id = id;
        this.nombre_agente = nombre_agente;
        this.id_usuario = id_usuario;
        this.descripcion = descripcion;
        this.verificado = verificado;
        this.id_multa = id_multa;
        this.fecha = fecha;
        this.tipo_reporte = tipo_reporte;
        this.nombre_usuario = nombre_usuario;
        this.apellido_usuario = apellido_usuario;
    }
}

export { ReporteAgente };
