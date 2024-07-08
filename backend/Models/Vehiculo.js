// vehicleModel.js
class Vehiculo {
    constructor(id, id_usuario, matricula, placa, marbete, ano, modelo, descripcion, tipo_Vehiculo) {
      this.id = id;
      this.id_usuario = id_usuario;
      this.matricula = matricula;
      this.placa = placa;
      this.marbete = marbete;
      this.ano = ano;
      this.modelo = modelo;
      this.descripcion = descripcion;
      this.tipo_Vehiculo = tipo_Vehiculo;
    }
  }
  
  export { Vehiculo };