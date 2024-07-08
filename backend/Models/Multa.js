class Multa {
  constructor(id, cedula_usuario, nombre_multado, matricula, placa, razon, estado, fecha, monto, id_agente, nombre_agente) {
    this.id = id;
    this.cedula_usuario = cedula_usuario;
    this.nombre_multado = nombre_multado;
    this.matricula = matricula;
    this.placa = placa;
    this.razon = razon;
    this.estado = estado;
    this.fecha = fecha;
    this.monto = monto;
    this.id_agente = id_agente;
    this.nombre_agente = nombre_agente;  // Nuevo campo para almacenar el nombre del agente
  }
}

  
  export { Multa };
  